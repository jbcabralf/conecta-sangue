# Escopo do projeto — ConectaSangue

Protótipo funcional: https://conecta-sangue.lovable.app

## 1. Identidade

**ConectaSangue** é um aplicativo que avisa doadores de sangue quando alguém perto deles precisa do seu tipo sanguíneo.

**Problema em uma frase:** quem precisa de sangue não tem um canal simples para chegar aos doadores compatíveis, e o doador não sabe quando e onde sua doação é necessária.

## 2. Foco

- **Usuário principal:** doador de sangue, pessoa física.
- - **Usuários secundários:** familiar de paciente (pede sangue) e hospital ou banco de sangue (pessoa jurídica).
  - - **Tarefa central do protótipo:** o doador se cadastra, vê as solicitações de sangue e descobre se é compatível com cada uma.
   
    - ## 3. Fronteiras
   
    - ### Dentro do escopo
   
    - | Área | O que o protótipo faz |
    - |---|---|
    - | Cadastro e login | Doador (pessoa física) cria conta e entra com e-mail e senha. |
    - | Cadastro de hospital/banco | Mostra a lista de documentos exigidos e o envio por e-mail. A aprovação não é automatizada. |
    - | Início | Saudação, aptidão para doar, campanhas e solicitações. |
    - | Solicitação | Detalhe do pedido e verificação de compatibilidade entre tipos sanguíneos (ABO/Rh). |
    - | Nova solicitação | Formulário (hoje só para familiar), salvo na conta do usuário. |
    - | Campanhas | Lista de campanhas e publicação de campanha própria, salva na conta. |
    - | Histórico | Intervalo entre doações por sexo biológico (90 dias para mulheres, 60 para homens). |
    - | Pré-requisitos | Pré-triagem com perguntas e cartilha do doador. |
   
    - ### Fora do escopo (itens explicitamente simulados ou excluídos)
   
    - - Envio real de notificações aos doadores.
      - - Geolocalização e cálculo de distância reais (as distâncias exibidas são de exemplo).
        - - Verificação real de biometria facial (o botão é demonstração e não coleta imagem).
          - - Validação real de identidade do solicitante e aprovação automática de hospitais.
            - - Publicação de solicitações por "Hospital ou banco" (opção desabilitada na tela).
              - - Divulgação das campanhas salvas a outros usuários.
                - - Dados clínicos reais: doações e hemograma do histórico são fictícios.
                  - - Confirmação real de interesse em doar (a ação é só demonstrativa).
                    - - Qualquer decisão médica: o app é informativo e a triagem oficial é presencial.
                     
                      - ## 4. Inventário
                     
                      - ### Reaproveitado do esboço anterior
                     
                      - - Telas 1 a 4 do PDF de referência: cadastro, início, detalhe da solicitação e nova solicitação.
                        - - Telas 5 (campanhas) e 6 (histórico), conforme o `roadmap.md` do repositório.
                          - - Identidade visual (cores e fontes) do PDF.
                           
                            - ### Descartado ou adiado
                           
                            - - Notificações reais, geolocalização, biometria e verificação automática de hospitais (ver "Fora do escopo").
                              - - *(O grupo deve complementar com o que foi descartado do esboço anterior, se houver.)*
                               
                                - ## 5. Registro de mudanças de escopo
                               
                                - O pedido inicial ao Lovable era **apenas as telas 1 e 2**. O escopo cresceu ao longo de 5 dias. Cada mudança abaixo indica o motivo e o impacto nas telas.
                               
                                - | Data (2026) | Mudança | Motivo | Impacto nas telas | Commit |
                                - |---|---|---|---|---|
                                - | 02/10 | Pedido inicial: telas 1 (cadastro) e 2 (início) | Ponto de partida do protótipo | Telas 1 e 2 | `06f8d08` |
                                - | 02/10 | Inclusão das telas 3 (detalhe/confirmação) e 4 (nova solicitação) | Seguir o PDF de referência | Tela 2 passa a levar à 3; nova tela 4 | `601f74f`, `328ed46` |
                                - | 02/10 | Persistência de dados com conta real (Supabase) | Cadastro e solicitações precisavam sobreviver ao recarregar a página | Tela 1 ganha modo "entrar"; telas 2, 3 e 4 leem e gravam dados da conta | `25dfaa4` |
                                - | 03/10 | Campanhas e regra de intervalo de doação | Completar as telas 5 e 6 do PDF | Novas telas 5 (campanhas) e 6 (histórico) | `bbdc1b6` |
                                - | 03/10 | Tela de pré-requisitos | Orientar o doador antes de doar *(origem a confirmar: PDF ou decisão do grupo)* | Nova tela 7; ligada ao início e ao histórico | `b707cc1` |
                                - | 04/10 | Cadastro de pessoa jurídica | Hospitais e bancos precisam de verificação de conformidade antes de usar a plataforma | Tela 1 ganha seletor "Pessoa física / Pessoa jurídica" e painel de documentos | `f5eb7df` |
                                - | 04/10 | Unificação das caixas de seleção e ajuste de avisos e validações | Consistência visual e mensagens de erro claras | Telas 1, 4 e 7 | `11bc799`, `fa0ebe4` |
                                - | 05/10 | Solicitação: distinção hospital/familiar e etapa de biometria (demonstração) | Diferenciar quem pode publicar sem simular uma validação real | Tela 4 | `7a53c72` |
                                - | 05/10 | Remoção de avisos vermelhos | Evitar alarme visual desnecessário | Várias telas | `334bea1` |
                               
                                - **Regra para as próximas mudanças:** antes de alterar o escopo, registrar nesta tabela o que mudou, por quê e quais telas são afetadas, e referenciar o commit ou PR.
                               
                                - Observação: a maioria dos commits do período tem a mensagem genérica "Changes" (gerada pelo Lovable). A tabela cita só os commits que identificam claramente a mudança.
                                - 
