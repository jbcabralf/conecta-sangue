# Pitch — ConectaSangue

## O problema

Hoje, quem precisa de sangue pede ajuda em grupos de WhatsApp e espera que alguém compatível veja a mensagem. Do outro lado, o doador não sabe quando e onde a doação dele faz diferença.

## A ideia

O ConectaSangue é um aplicativo que avisa o doador quando alguém perto dele precisa do seu tipo sanguíneo. O familiar, o hospital ou o banco de sangue publica a solicitação, e o app mostra aos doadores compatíveis. A ideia é que o aviso chegue aos doadores do mesmo bairro, usando o bairro do cadastro, sem GPS.

Também fazem parte do projeto o órgão público de saúde, que publica campanhas de conscientização, e um patrocinador (ONG, fundação ou empresa) que financia o desenvolvimento.

## O que o protótipo mostra

O protótipo tem 7 telas: cadastro, início, solicitação, nova solicitação, campanhas, histórico e pré-requisitos. Com ele dá para:

1. Cadastrar-se como doador, com nome, bairro e tipo sanguíneo.
2. Ver as solicitações e saber na hora se o seu tipo é compatível.
3. Responder à pré-triagem "Posso doar hoje?" e ler a cartilha do doador.
4. Ver o histórico, o intervalo entre doações (90 dias para mulheres, 60 para homens) e o hemograma simples depois de doar.
5. Publicar um pedido de sangue como familiar.

O hemograma simples (hemoglobina, hematócrito e plaquetas) é a vantagem não financeira para quem doa, porque os bancos de sangue já fazem os exames.

## O que ainda é demonstração

Os avisos aos doadores, a biometria facial, a confirmação de interesse e as distâncias são simulados, e o app avisa isso nas telas. O cadastro de hospitais só mostra a lista de documentos e o e-mail de envio. A publicação por hospital está desabilitada. A lista completa, com a situação de cada requisito, está em [`docs/requisitos.md`](../docs/requisitos.md).

## Demonstração em 2 minutos

1. Abrir https://conecta-sangue.lovable.app e tocar em "Ver início de exemplo".
2. Abrir a solicitação do Hospital Central e mostrar "Você é compatível".
3. Abrir "Pré-requisitos" e fazer a pré-triagem.
4. Abrir "Histórico" e escolher o sexo para ver o intervalo entre doações.
5. Abrir "Pedir sangue" e salvar uma solicitação com dados fictícios.

## Custo e próximos passos

Estimamos cerca de 5 meses de desenvolvimento e entre R$ 1,07 e R$ 1,34 milhão até o fim do primeiro ano, por isso o projeto precisa de patrocinador. Antes da versão real, falta enviar notificações de verdade, filtrar por bairro e verificar a identidade de quem pede sangue. Para isso entrar sem reescrever as telas, o primeiro passo técnico é separar o acesso a dados em uma camada de serviço.
