# Monolito modular — decisão de arquitetura

## O que é

O ConectaSangue é um único produto, em um único repositório, dividido em módulos com responsabilidades separadas:

| Módulo | Pasta | Responsabilidade |
|---|---|---|
| Telas e navegação | `src/routes/` | As 7 telas: cadastro, início, solicitação, nova solicitação, campanhas, histórico e pré-requisitos. |
| Componentes de interface | `src/components/` | Peças reutilizáveis, como a barra de navegação inferior e os botões. |
| Regras de negócio | `src/lib/blood.ts` | Compatibilidade entre tipos sanguíneos e intervalo entre doações. |
| Acesso a dados | `src/integrations/supabase/` | Conexão com o Supabase: conta de usuário e três tabelas (perfis de doador, solicitações e campanhas). |

## Por que não microsserviços

Microsserviços dividem o sistema em serviços independentes, cada um com seu próprio deploy, seus dados e uma rede entre eles. Esse custo só compensa quando partes do sistema ou equipes diferentes precisam escalar e evoluir separadamente. O ConectaSangue é um protótipo acadêmico de primeiro período, com 7 telas, 3 tabelas e um único fluxo de publicação pelo Lovable. Dividi-lo em serviços criaria problemas que o projeto não tem (comunicação entre serviços, autenticação compartilhada, contratos entre APIs e vários pipelines para manter) sem trazer ganho, porque nenhuma parte tem carga ou ritmo de mudança que justifique escalar à parte. Um repositório único com módulos de responsabilidade separada dá a simplicidade e o controle que esta entrega exige e deixa aberta a possibilidade de extrair um módulo no futuro, caso ele passe a precisar disso.

## Limite atual

As telas ainda chamam o Supabase diretamente, sem uma camada de serviço no meio, o que mistura apresentação e acesso a dados. Separar essa camada é a principal melhoria de manutenção preventiva prevista para manter as fronteiras entre os módulos claras.
