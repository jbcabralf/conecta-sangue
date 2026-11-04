# Manutenção e custo de manutenção — ConectaSangue

Os quatro tipos de manutenção, com exemplos que aconteceram neste repositório ou que estão pendentes nele. Os hashes são commits do histórico da `main`.

## Os quatro tipos

| Tipo | Definição | Exemplo no ConectaSangue |
|---|---|---|
| **Corretiva** | Consertar defeitos | Ainda sem commit de correção registrado. Defeito identificado na revisão: a exclusão de campanha acontece sem confirmação (ver [`metricas-de-qualidade.md`](metricas-de-qualidade.md)). |
| **Adaptativa** | Mudar por causa do contexto externo | `f5eb7df` "Adicionou cadastro PJ": hospitais e bancos de sangue exigem verificação de conformidade antes de usar a plataforma, então o cadastro ganhou o painel de documentos. |
| **Perfectiva** | Melhorar a experiência | `11bc799` "Unificou caixas de check", `fa0ebe4` "Ajustou avisos e validação" e `334bea1` "Removeu avisos vermelhos": consistência visual, mensagens de erro mais claras e menos alarme visual (motivos registrados no [`escopo.md`](escopo.md)). |
| **Preventiva** | Proteger o futuro | Pendente: separar da tela as regras de pré-triagem (idade, peso, perguntas) e o acesso ao Supabase, criando uma camada de serviço (ver [`arquitetura-mvc-camadas.md`](arquitetura-mvc-camadas.md)). |

## Custo do caos, com um exemplo do próprio sistema

O custo de mudar o sistema cresce a cada etapa em que algo fica sem registro: definição do problema, protótipo, versões sem rastreio e ausência de documentação.

Exemplo concreto: a regra de intervalo entre doações (90 dias para mulheres, 60 para homens) foi criada em `bbdc1b6` e vive em `src/lib/blood.ts`. Se o Ministério da Saúde mudar o intervalo, a alteração é de uma linha e a tela de histórico se atualiza sozinha. Já a regra de idade (16 a 69 anos) está escrita dentro de `pre-requisitos.tsx`. Mudá-la exige abrir a tela, achar o número e conferir se o texto "16 a 69" repetido na mensagem também foi atualizado. Quanto mais regras ficarem nesse segundo formato, mais cara fica cada mudança.

Outro exemplo: a maioria dos commits gerados pelo Lovable tem a mensagem genérica "Changes". O motivo de cada mudança, como a entrada do cadastro PJ, só está registrado no [`escopo.md`](escopo.md), não no histórico do Git. Por isso a regra do projeto é registrar cada mudança relevante no escopo e no PR no mesmo ciclo em que ela é feita.

## Regras de manutenção do repositório

1. Toda mudança entra por branch e pull request, com revisão de outro integrante antes do merge. Nunca direto na `main`.
2. Mensagem de commit na primeira linha, no imperativo, descrevendo o efeito (ex.: "Documenta decisão por monolito modular").
3. O PR informa objetivo, telas afetadas, como testar e requisito relacionado.
4. Mudança de escopo é registrada na tabela do `escopo.md` com data, motivo, telas afetadas e commit ou PR.
5. Nenhum token, credencial ou dado pessoal real no repositório.
6. Depois do merge, a branch é apagada.

## Fila de manutenção planejada

| Item | Tipo | Telas afetadas |
|---|---|---|
| Confirmar antes de excluir campanha | Corretiva | Campanhas |
| Conferir regras de acesso do Supabase e conteúdo do `.env` | Corretiva | Todas que leem dados da conta |
| Mover regras de pré-triagem para `src/lib/` | Preventiva | Pré-requisitos |
| Criar camada de serviço para o Supabase | Preventiva | Início, Solicitação, Nova solicitação, Campanhas, Histórico |
| Mensagem de estado vazio nas listas | Perfectiva | Início, Campanhas |
| Unificar `familiar`/`family` e `−`/`-` | Perfectiva | Nova solicitação, Início, Solicitação |
