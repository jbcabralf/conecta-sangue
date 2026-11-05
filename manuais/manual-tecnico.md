# Manual técnico — ConectaSangue

Para quem vai obter, rodar, alterar e manter o projeto.

## 1. Tecnologias

| Parte | Tecnologia |
|---|---|
| Aplicação | React 19, TanStack Start e TanStack Router (rotas por arquivo), Vite |
| Estilo | Tailwind CSS 4 e componentes em `src/components/ui/` |
| Dados e conta | Supabase (autenticação e 3 tabelas); Drizzle configurado em `drizzle.config.ts` |
| Qualidade | ESLint, Prettier e Vitest |
| Criação e publicação | Lovable, sincronizado com este repositório |

## 2. Como obter e rodar

Requisitos: Node.js e npm.

```
git clone <url-do-repositorio>
cd conecta-sangue
npm i
npm run dev
```

Comandos disponíveis (`package.json`):

| Comando | Para que serve |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção |
| `npm run preview` | Visualiza a versão gerada |
| `npm run lint` | Verifica o código com ESLint |
| `npm run format` | Formata o código com Prettier |
| `npm test` | Roda os testes (Vitest) |

O arquivo `.env` já está no repositório, gerado pelo Lovable. Ele deve conter apenas chaves públicas do Supabase. Nunca adicione chaves secretas ou de serviço a ele.

## 3. Estrutura de pastas

| Pasta ou arquivo | Responsabilidade |
|---|---|
| `src/routes/` | As 7 telas (uma por arquivo) e o layout raiz `__root.tsx` |
| `src/components/` | `BottomNav.tsx` e os componentes de interface em `ui/` |
| `src/lib/blood.ts` | Regras de negócio: compatibilidade ABO/Rh, intervalo entre doações, dados de exemplo |
| `src/integrations/supabase/` | Conexão e tipos do Supabase |
| `src/test/` | Testes |
| `supabase/` | Configuração do Supabase |
| `docs/` | Documentação de escopo, arquitetura, qualidade, manutenção e produção |
| `manuais/`, `pitch/`, `prototipo/` | Manuais, pitch, canvas e material do protótipo |

`src/routeTree.gen.ts` é gerado automaticamente e não deve ser editado à mão.

## 4. Rotas

`/` cadastro e entrada, `/inicio`, `/solicitacao?id=`, `/nova-solicitacao`, `/campanhas`, `/historico` e `/pre-requisitos`.

## 5. Dados

Três tabelas no Supabase: `donor_profiles` (perfil do doador, incluindo sexo para a regra de intervalo), `blood_requests` (solicitações salvas) e `campaigns` (campanhas salvas). O `AGENTS.md` do repositório define que os dados do doador ficam em tabela com acesso restrito ao dono, e que solicitações salvas só devem ser visíveis ao autor. Confira essas regras de acesso no painel do Supabase quando alterar tabelas.

## 6. Regras de ouro do código

- A compatibilidade entre tipos sanguíneos vem sempre de `canDonate` em `src/lib/blood.ts`. Nunca escreva um tipo sanguíneo fixo no texto de uma tela.
- Dados de exemplo ficam claramente separados de dados reais e identificados na tela.
- Uma ação demonstrativa (notificação, biometria, confirmar interesse) deve dizer na tela que nada real foi enviado.

Detalhes e pendências de arquitetura: [`../docs/arquitetura-mvc-camadas.md`](../docs/arquitetura-mvc-camadas.md) e [`../docs/monolito-modular.md`](../docs/monolito-modular.md).

## 7. Regras de versionamento

1. A `main` guarda somente versões estáveis e demonstráveis.
2. Cada mudança nasce em uma branch com nome pelo objetivo: `docs/...`, `fix/...` ou `feature/...`.
3. Commits pequenos e coerentes. A primeira linha é curta, no imperativo, e descreve o efeito. Exemplos: "Documenta decisão por monolito modular" e "Corrige formatação de listas e tabelas do escopo". Evite "update", "ajustes", "final" e "arquivos".
4. A mudança entra por pull request, que informa objetivo, telas afetadas, como testar e requisito relacionado.
5. Outro integrante revisa e aprova antes do merge. Nunca fazer merge direto na `main` sem revisão.
6. Depois do merge, apague a branch.
7. Nenhum token, credencial ou dado pessoal real no repositório.
8. Mudança de escopo é registrada na tabela de [`../docs/escopo.md`](../docs/escopo.md).

**Sincronização com o Lovable.** Commits na `main` aparecem no editor do Lovable, e mudanças feitas no Lovable são commitadas aqui. Por isso, nunca reescreva o histórico já publicado (sem force push, rebase, amend ou squash em commits enviados) e mantenha a `main` funcionando.

## 8. Manutenção

Tipos de manutenção, exemplos do próprio sistema e fila planejada: [`../docs/manutencao.md`](../docs/manutencao.md). Revisão de qualidade e pendências: [`../docs/metricas-de-qualidade.md`](../docs/metricas-de-qualidade.md).

## 9. Por que esta organização

O projeto usa camadas e MVC para que a regra (compatibilidade, intervalo) não dependa da aparência da tela, e monolito modular porque são 7 telas, 3 tabelas e um único fluxo de publicação, caso em que microsserviços trariam custo sem ganho. A justificativa completa está em [`../docs/monolito-modular.md`](../docs/monolito-modular.md).
