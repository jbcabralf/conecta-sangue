# Produção passo a passo — ConectaSangue

Sequência real de construção do projeto, ligada aos commits e PRs do repositório. Os hashes podem ser abertos em `/commit/<hash>`.

## 1. Caminho crítico: onde está cada passo

| # | Passo | Onde está | Registro no Git |
|---|---|---|---|
| 1 | Consolidar o problema herdado e os limites de escopo | [`escopo.md`](escopo.md) | PR #1 (`98cc41e`), PR #2 (`0a784ab`) |
| 2 | Definir camadas, Models, Views e Controllers | [`arquitetura-mvc-camadas.md`](arquitetura-mvc-camadas.md) | PR #4 (`a8b9d8f`) |
| 3 | Justificar o monolito modular | [`monolito-modular.md`](monolito-modular.md) | PR #3 (`18eea63`), PR #4 (`bb940fc`) |
| 4 | Montar os fluxos de tela navegáveis | [`fluxos-de-tela.md`](fluxos-de-tela.md), [`../prototipo/`](../prototipo/README.md) | Commits do Lovable (seção 2 abaixo), PR #5 (`e7ddccc`) |
| 5 | Revisar as telas pelas métricas de qualidade | [`metricas-de-qualidade.md`](metricas-de-qualidade.md) | PR #5 (`e7ddccc`) |
| 6 | Versionar cada incremento via Git | Este arquivo e o histórico de PRs | PRs #1 a #5 e os PRs seguintes |
| 7 | Escrever a documentação de produção referenciando commits | Este arquivo | Este PR |
| 8 | Produzir manuais, pitch e canvas | [`../manuais/`](../manuais/manual-do-usuario.md), [`../pitch/`](../pitch/Pitch.md) | PRs da etapa final (#6 em diante) |
| 9 | Publicar o repositório público e verificar acessos | Não feito | Repositório mantido privado por decisão do grupo, por enquanto |

## 2. Construção do protótipo (Lovable, 02 a 05/10/2026)

O protótipo foi gerado no Lovable a partir do PDF de referência e sincronizado com este repositório. O pedido inicial era só as telas 1 e 2. As mudanças de escopo e seus motivos estão na tabela de [`escopo.md`](escopo.md).

| Data | O que foi feito | Commit |
|---|---|---|
| 02/10 | Telas 1 (cadastro) e 2 (início) | `06f8d08` "Criou telas 1 e 2 do app" |
| 02/10 | Análise do PDF das telas 3 e 4, depois as telas 3 (solicitação) e 4 (nova solicitação) | `601f74f`, `328ed46` |
| 02/10 | Persistência com conta real (Supabase) | `25dfaa4` "Implementou persistência dos dados" |
| 03/10 | Campanhas e regra de intervalo entre doações | `bbdc1b6` |
| 03/10 | Tela de pré-requisitos | `b707cc1` |
| 04/10 | Cadastro de pessoa jurídica | `f5eb7df` |
| 04/10 | Caixas de seleção unificadas; avisos e validações ajustados | `11bc799`, `fa0ebe4` |
| 05/10 | Solicitação com distinção hospital/familiar e biometria de demonstração | `7a53c72` |
| 05/10 | Remoção de avisos vermelhos | `334bea1` |

A maioria dos commits do Lovable tem a mensagem genérica "Changes". Os commits acima são os que identificam claramente a mudança.

## 3. Versionamento e documentação (28/10 a 04/11/2026)

Depois do protótipo, o repositório passou a receber mudanças por branch e pull request, revisadas por outro integrante do grupo.

| Data | PR | Branch | Conteúdo | Commit |
|---|---|---|---|---|
| 28/10 | #1 | `docs/escopo` | Escopo e registro de mudanças | `98cc41e` |
| 28/10 | #2 | `fix/formatacao-escopo` | Correção de listas e tabelas do escopo | `0a784ab` |
| 28/10 | #3 | `docs/monolito-modular` | Decisão por monolito modular | `18eea63` |
| 04/11 | #4 | `docs/arquitetura-mvc` | Camadas e mapeamento MVC; ligação com o monolito | `a8b9d8f`, `bb940fc` |
| 04/11 | #5 | `docs/fluxos-metricas-manutencao` | Fluxos de tela, métricas de qualidade e manutenção | `e7ddccc` |
| 04/11 | #6 em diante | `docs/...` | Produção passo a passo, manuais, pitch, canvas, protótipo, README e roadmap | Ver lista de PRs |

## 4. Exceções ao fluxo, registradas

O fluxo adotado é branch, commits, PR, revisão por outro integrante e merge. O histórico tem três exceções, todas de 28/10 (PRs #1 e #3 e o commit `2ccd0db`):

- PR #3 foi mesclado pela própria autora, sem revisão de outro integrante.
- PR #1 foi mesclado sem aprovação registrada.
- O commit `2ccd0db` "Update escopo.md" entrou direto na `main`. Ele só removeu uma linha de rascunho do `escopo.md`.

Os PRs #2, #4 e #5 têm aprovação registrada. A partir da etapa final, todo PR passa por aprovação de outro integrante antes do merge.

## 5. Ordem real e o que ela ensina

A ordem real foi protótipo primeiro e documentação depois, o inverso do caminho crítico ideal. Isso gerou o custo descrito em [`manutencao.md`](manutencao.md): o motivo de cada mudança do protótipo precisou ser reconstruído a partir das datas e das mensagens do Lovable. Nos próximos incrementos, o registro no `escopo.md` e no PR acontece no mesmo ciclo da mudança.
