# Canvas — ConectaSangue

Resumo do projeto em uma página, com base no Termo de Abertura e nos Requisitos v2.

| Bloco | Conteúdo |
|---|---|
| Problema | Doadores de sangue não sabem onde e quando há necessidade real e urgente. Quem precisa de sangue recorre a grupos de WhatsApp e depende de a mensagem chegar a alguém compatível. |
| Objetivo | Aproximar doadores e solicitantes em tempo real. |
| Público-alvo | Doador (pessoa física), familiar de paciente, hospital ou banco de sangue. |
| Proposta de valor | Avisar o doador quando o tipo sanguíneo dele é necessário no bairro e mostrar na hora se ele é compatível. |
| Vantagem ao doador | Hemograma simples (hemoglobina, hematócrito e plaquetas), sem custo, já que os bancos de sangue fazem os exames de qualquer forma. Ver [`requisitos.md`](../docs/requisitos.md), RF9. |
| Solução (protótipo) | 7 telas: cadastro, início, solicitação, nova solicitação, campanhas, histórico e pré-requisitos. |
| Canais | Aplicativo web (https://conecta-sangue.lovable.app), e-mail para o cadastro de hospitais e bancos, e campanhas de órgãos públicos de saúde dentro do aplicativo. |
| Parceiros e financiamento | Órgão público de saúde publica campanhas e não financia o app. Um patrocinador (ONG, fundação ou empresa) financia o desenvolvimento. |
| Equipe | Luanna (Product Owner), Julia (Scrum Master), João e Paulo. Luanna e Julia também desenvolvem. |
| Fora do escopo | Integração com sistemas hospitalares, pagamentos, menores de idade, outros materiais biológicos, geolocalização real e biometria real. |

## Custos e prazo (estimativa)

MVP enxuto, cerca de 5 meses de desenvolvimento, com salários de mercado de 2026. É uma estimativa e não um orçamento fechado.

| Item | Valor |
|---|---|
| Desenvolvimento | R$ 307 a 410 mil |
| Operação no 1º ano | R$ 654 a 819 mil |
| Marketing no 1º ano | R$ 111 mil |
| Total até o fim do 1º ano | R$ 1,07 a 1,34 milhão |
| Nuvem (AWS), para 100 mil doadores | cerca de US$ 658 por mês (R$ 3,3 mil) |

## Riscos

Os três riscos do Termo de Abertura e o que o protótipo faz a respeito.

| Risco | Resposta do projeto | No protótipo |
|---|---|---|
| O escopo crescer demais | O órgão público só publica campanhas, e o hemograma simples é só exibição de resultado, sem integração com laboratório. | Tela Campanhas e cartão de hemograma no Histórico. |
| Dificuldade em modelar a elegibilidade | Regra fixa de intervalo por sexo biológico, mais um checklist informativo. | Histórico (90 e 60 dias) e tela Pré-requisitos. |
| Solicitações falsas ou não verificáveis | Biometria facial do solicitante e análise de documentos de hospitais e bancos. | Botão de biometria demonstrativo e cadastro de pessoa jurídica com 8 documentos. A verificação real não existe e a biometria ainda não é exigida para salvar (RN6). |

## Outros pontos de atenção

- Dados de saúde ficam no Supabase, e as regras de acesso ainda precisam ser conferidas (RNF2).
- A regra de compatibilidade fica em `src/lib/blood.ts`, separada de Lovable e Supabase.
- A documentação acompanha o protótipo: cada mudança de escopo entra no [`escopo.md`](../docs/escopo.md) no mesmo pull request.
