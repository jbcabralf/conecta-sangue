# Canvas — ConectaSangue

Síntese do problema, da solução, dos canais e dos riscos.

| Bloco | Conteúdo |
|---|---|
| **Problema** | Quem precisa de sangue não tem um canal simples para chegar aos doadores compatíveis. O doador não sabe quando e onde sua doação é necessária. |
| **Usuários** | Principal: doador de sangue (pessoa física). Secundários: familiar de paciente e hospital ou banco de sangue (pessoa jurídica). |
| **Proposta de valor** | Avisar o doador quando alguém perto dele precisa do seu tipo sanguíneo e mostrar na hora se ele é compatível. |
| **Solução (protótipo)** | Cadastro, início com solicitações e campanhas, detalhe da solicitação com compatibilidade, nova solicitação, campanhas, histórico com intervalo entre doações e pré-triagem de aptidão. 7 telas. |
| **Canais** | Aplicativo web publicado (https://conecta-sangue.lovable.app). E-mail para o cadastro de hospitais e bancos de sangue, com envio de documentos. Campanhas de conscientização de órgãos de saúde, dentro do aplicativo. |
| **Fora do escopo (hoje)** | Notificações reais, geolocalização real, biometria real, validação real de identidade, aprovação automática de hospitais, divulgação das campanhas a outros usuários, dados clínicos reais, qualquer decisão médica. |
| **Medidas de sucesso do protótipo** | A tarefa principal termina em até 3 telas. Um avaliador terceiro navega do início ao fim sem perguntar nada à equipe. Telas, regras e requisitos usam os mesmos nomes (ver [`../docs/metricas-de-qualidade.md`](../docs/metricas-de-qualidade.md)). |

## Riscos e como o projeto os trata

| Risco | Tratamento atual | Pendente |
|---|---|---|
| Dados sensíveis do doador (tipo sanguíneo, sexo, local) | Dados do doador em tabela com acesso restrito ao dono; o Início mostra só o primeiro nome | Conferir as regras de acesso do Supabase e o conteúdo do `.env` |
| Solicitações falsas ou de má-fé | Identidade do solicitante não é validada, e a tela diz "Identidade ainda não verificada" para solicitações salvas; "Hospital ou banco" desabilitado | Validação real de identidade e de hospitais |
| Usuário tomar decisão médica pelo aplicativo | Textos informam que a triagem oficial é presencial; a aptidão aparece como "não verificada" | Manter o aviso em toda tela que fala de aptidão |
| Parecer que o aplicativo funciona de verdade quando é demonstração | Todo item simulado é rotulado e as ações demonstrativas dizem que nada real foi enviado | Revisar os rótulos a cada nova tela |
| Valor central ausente (sem notificação real o doador não é avisado) | Declarado como fora do escopo | Próximo incremento do [`Pitch.md`](Pitch.md) |
| Dependência de Lovable e Supabase | Regras de negócio em `src/lib/blood.ts`, independentes das duas | Camada de serviço entre telas e Supabase |
| Documentação defasada em relação ao protótipo | Registro de mudanças no [`escopo.md`](../docs/escopo.md) e PR por mudança | Manter o registro no mesmo ciclo da mudança |
