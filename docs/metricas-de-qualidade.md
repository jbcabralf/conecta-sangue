# Revisão das telas pelas métricas de qualidade

Revisão feita sobre o código atual da `main` (`src/routes/*.tsx`). Cada métrica tem o critério definido para o protótipo, o que foi encontrado e o que fica pendente.

Legenda: **Atende**, **Parcial**, **Não atende**.

| Métrica | Critério | Resultado | Evidência no sistema |
|---|---|---|---|
| Usabilidade | A tarefa principal termina em até 3 telas; ação primária sempre evidente | **Atende** | Cadastro → Início → Solicitação (3 telas). Cada tela tem um botão principal em destaque ("Criar conta de doador", "Confirmar interesse", "Salvar solicitação"). |
| Confiabilidade | Caminho de volta em todo fluxo; confirmação clara em ações destrutivas | **Parcial** | Há caminho de volta em todas as telas (seta ou barra inferior). **Falha:** o ícone de lixeira em Campanhas exclui na hora, sem pedir confirmação (`remove` em `campanhas.tsx`). |
| Desempenho | Estados vazios em listas; resposta visual imediata em buscas | **Parcial** | Há estado de carregamento e de "não encontrada" na Solicitação. As seções "Suas solicitações" e "Suas campanhas" ficam ocultas quando vazias, sem mensagem explicando. Não há busca no protótipo. |
| Segurança | Não exibir dados sensíveis sem necessidade | **Parcial** | O Início mostra só o primeiro nome. O formulário de nova solicitação pede nome de paciente, então só deve receber nomes fictícios. A consulta `blood_requests` no Início não filtra por usuário no código; o isolamento depende das regras de acesso (RLS) do Supabase, que precisam ser conferidas. O arquivo `.env` está versionado e precisa conter só chaves públicas. |
| Testabilidade | Fluxo navegável por terceiros sem explicação oral | **Atende** | O link "Ver início de exemplo" dá acesso ao fluxo sem conta. Os textos avisam quando algo é demonstração. Passo a passo em [`fluxos-de-tela.md`](fluxos-de-tela.md). |
| Rastreabilidade | Tela, regra e requisito usam os mesmos nomes | **Parcial** | As rotas, o `escopo.md` e a documentação usam os mesmos nomes de tela. No código há dois vocabulários para o mesmo conceito (`family` na tela, `familiar` no banco; `A−` na tela, `A-` no banco, convertidos por `normalizeType`). |
| Manutenibilidade | Alterar uma regra não exige recriar as telas | **Parcial** | Compatibilidade e intervalo de doação estão em `src/lib/blood.ts`. Os limites de idade e peso e as perguntas da pré-triagem estão dentro de `pre-requisitos.tsx`. |
| Evolutividade | Pronto para receber novos módulos sem quebrar a navegação | **Atende** | Cada tela é um arquivo de rota independente e a `BottomNav` é um componente único. Adicionar uma tela é criar um arquivo em `src/routes/` e um item na barra. |

## Pendências priorizadas

1. **Confirmar antes de excluir campanha** (Confiabilidade, correção). Diálogo simples "Excluir esta campanha?".
2. **Conferir as regras de acesso do Supabase e o conteúdo do `.env`** (Segurança). Cada usuário deve ler apenas as próprias solicitações e campanhas, e o `.env` não pode ter chave de serviço.
3. **Mover as regras de pré-triagem para `src/lib/`** (Manutenibilidade, prevenção).
4. **Mensagem de estado vazio** em "Suas solicitações" e "Suas campanhas" (Desempenho, melhoria).
5. **Unificar o vocabulário** `familiar`/`family` e `−`/`-` (Rastreabilidade).

Cada item vira um branch e um pull request próprios, com o item registrado no [`escopo.md`](escopo.md) se mudar uma tela.
