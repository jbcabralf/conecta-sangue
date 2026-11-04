# Pitch — ConectaSangue

## O problema

Quem precisa de sangue não tem um canal simples para chegar aos doadores compatíveis. E o doador não sabe quando e onde a sua doação é necessária.

## Para quem

O doador de sangue, pessoa física, é o usuário principal. Os usuários secundários são o familiar de um paciente, que pede sangue, e o hospital ou banco de sangue, que precisa passar por uma verificação antes de usar a plataforma.

## A solução

ConectaSangue é um aplicativo que avisa doadores quando alguém perto deles precisa do seu tipo sanguíneo.

Em três passos, o doador:

1. Se cadastra com nome, bairro e tipo sanguíneo.
2. Vê as solicitações de sangue e as campanhas na tela inicial.
3. Descobre na hora se é compatível com cada solicitação.

## O que nos diferencia

- **Compatibilidade calculada, não escrita à mão.** A regra entre tipos sanguíneos (ABO/Rh) existe em um único lugar do código, e todas as telas usam a mesma regra.
- **Pré-triagem antes de ir ao hemocentro.** O doador responde a perguntas de idade, peso, sono, alimentação e saúde e descobre o que o impede de doar hoje, com a cartilha do doador ao lado.
- **Regra de intervalo entre doações.** O histórico mostra 90 dias para mulheres e 60 para homens, com o máximo de doações por ano.
- **Honestidade sobre o que é demonstração.** Tudo que é exemplo ou simulado aparece identificado na tela, e nenhuma ação simulada parece operacional.
- **Caminho curto.** A tarefa principal (cadastrar, ver a solicitação e saber se é compatível) termina em até 3 telas.

## Demonstração (2 minutos)

1. Abrir https://conecta-sangue.lovable.app e tocar em "Ver início de exemplo".
2. Abrir a solicitação do Hospital Central e mostrar "Você é compatível".
3. Abrir "Pré-requisitos" e fazer a pré-triagem.
4. Mostrar "Histórico" e escolher o sexo para ver o intervalo entre doações.
5. Mostrar "Pedir sangue" e salvar uma solicitação com dados fictícios.

## Próximo incremento

O que ficou deliberadamente fora desta versão é o que dá o valor completo ao produto:

1. Envio real de notificações aos doadores compatíveis.
2. Geolocalização e cálculo de distância reais.
3. Validação real de identidade do solicitante e aprovação de hospitais.

Antes disso, a prioridade técnica é separar o acesso a dados da tela (camada de serviço), para que essas funções entrem sem reescrever as telas.
