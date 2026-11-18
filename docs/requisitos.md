# Requisitos e situação no protótipo

Este documento liga cada requisito do projeto (Requisitos v2, Aula 3) à tela do aplicativo e diz o que o protótipo faz hoje. A situação foi conferida no código em `src/routes/` e `src/lib/blood.ts`.

Situação: Atendido (funciona como descrito), Parcial (funciona em parte ou só com dados de exemplo) e Não atendido (o protótipo não faz).

## Requisitos funcionais

| ID | Requisito | Tela | Situação | Observação |
|---|---|---|---|---|
| RF1 | Cadastro do doador | Cadastro | Atendido | Nome, e-mail, bairro e cidade (um só campo), tipo sanguíneo e senha. As doações do histórico são de exemplo. |
| RF2 | Aptidão pelo intervalo e pelo sexo biológico | Histórico | Atendido | Mulheres 90 dias (até 3 em 12 meses), homens 60 dias (até 4). Regra em `src/lib/blood.ts`. |
| RF3 | Hospital ou banco publica solicitação | Nova solicitação | Não atendido | A opção "Hospital ou banco" está desabilitada na tela. |
| RF4 | Familiar publica solicitação | Nova solicitação | Atendido | Os campos obrigatórios são validados antes de salvar. |
| RF5 | Notificar doadores compatíveis do mesmo bairro | Início | Parcial | O Início mostra solicitações e a compatibilidade ABO/Rh. Não há notificação nem filtro por bairro, e as distâncias são de exemplo. |
| RF6 | Doador confirma interesse | Solicitação | Parcial | O botão é demonstrativo: nada é gravado nem enviado. |
| RF7 | Órgão público publica campanhas | Campanhas | Parcial | A campanha é salva na conta de quem publica e não aparece para outros usuários. Qualquer usuário logado consegue publicar. |
| RF8 | Histórico, próxima doação e e-mails de alerta | Histórico | Parcial | Há histórico e intervalo por sexo, com dados de exemplo. Não há e-mail de alerta. |
| RF9 | Resultado do hemograma simples | Histórico | Atendido | Hemoglobina, hematócrito e plaquetas, com dados de exemplo. O título da tela ainda diz "Hemograma". |
| RF10 | Cadastro de hospital ou banco com 8 documentos | Cadastro | Parcial | A tela lista os documentos e abre o e-mail de envio. A análise e a aprovação não são automatizadas. |
| RF11 | Pré-triagem e cartilha | Pré-requisitos | Atendido | Idade, peso e checklist de 7 itens, mais a cartilha. |

## Requisitos não funcionais

| ID | Requisito | Situação | Observação |
|---|---|---|---|
| RNF1 | Notificações em segundos | Não atendido | Não existe envio de notificações. |
| RNF2 | Dados de saúde protegidos (LGPD) | A conferir | Os dados ficam no Supabase. As regras de acesso ainda não foram conferidas. |
| RNF3 | Interface simples e acessível | Atendido | Barra de navegação fixa, botões grandes e rótulos curtos. |
| RNF4 | Campos obrigatórios validados | Atendido | Vale para as solicitações de pessoa física. |
| RNF5 | Disponibilidade o dia todo | Atendido | Depende da hospedagem do Lovable e do Supabase. |
| RNF6 | Transparência sobre o que é exemplo | Atendido | Dados de exemplo e ações demonstrativas vêm identificados na tela. |
| RNF7 | Biometria só demonstrativa | Atendido | Nenhuma imagem do rosto é coletada. |

## Regras de negócio

| ID | Regra | Situação | Observação |
|---|---|---|---|
| RN1 | Intervalo mínimo por sexo biológico | Atendido | Ver RF2. |
| RN2 | Próxima doação = última + intervalo | Atendido | Mostra "Disponível agora" quando a data já passou. |
| RN3 | O app informa a aptidão, mas não a certifica | Atendido | Há avisos de que a triagem oficial é presencial. |
| RN4 | Só órgão público publica campanhas | Não atendido | O protótipo não distingue o tipo de usuário. |
| RN5 | Hospital só acessa depois da análise dos documentos | Parcial | A análise acontece fora do app, por e-mail. |
| RN6 | Solicitação só é publicada depois da biometria | Não atendido | O botão de biometria existe, mas salvar não depende dele. |
| RN7 | Hemograma só com 3 valores e sem laboratório | Atendido | Dados de exemplo. |

## User stories

| ID | Resumo | Situação |
|---|---|---|
| US1 | Doador é avisado quando seu tipo é necessário no bairro | Parcial (RF5) |
| US2 | Hospital publica solicitação urgente | Não atendido (RF3) |
| US3 | Familiar publica pedido de doação | Atendido |
| US4 | Doador vê histórico e quando poderá doar de novo | Atendido |
| US5 | Órgão público divulga campanhas | Parcial (RF7) |
| US6 | Doador vê o hemograma simples | Atendido |
| US7 | Doador checa pré-requisitos e lê a cartilha | Atendido |
| US8 | Hospital se cadastra enviando documentos | Parcial (RF10) |

## Diferenças que mudariam o código

Quatro itens do levantamento não estão no protótipo: a publicação por hospital (RF3, US2), a biometria obrigatória antes de salvar (RN6), a restrição das campanhas a órgãos públicos (RN4) e o match por bairro com notificação (RF5, RNF1).

O trabalho desta etapa é versionar e documentar o protótipo, então por enquanto eles ficam registrados aqui e em [`escopo.md`](escopo.md) como limitações conhecidas. Se o grupo decidir ajustar o app, cada ajuste entra por branch e pull request e esta tabela é atualizada no mesmo PR.
