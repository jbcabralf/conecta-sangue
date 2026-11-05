# Protótipo — ConectaSangue

**Link público:** https://conecta-sangue.lovable.app

O protótipo é a própria aplicação publicada pelo Lovable, aberta em qualquer navegador, sem login e sem permissão privada. Não há arquivo de Figma. As imagens desta pasta são as exportações das telas, feitas do protótipo em execução.

## Como navegar sem conta

1. Abra o link e toque em "Ver início de exemplo".
2. Toque na solicitação do Hospital Central.
3. Use a barra inferior para ir a Campanhas, Pedir sangue e Histórico.

Passo a passo completo: [`../docs/fluxos-de-tela.md`](../docs/fluxos-de-tela.md). Guia de uso: [`../manuais/manual-do-usuario.md`](../manuais/manual-do-usuario.md).

## Telas

| # | Tela | Rota | Exportação |
|---|---|---|---|
| 1 | Cadastro do doador | `/` | ![Cadastro](01-cadastro.png) |
| 2 | Início | `/inicio` | ![Início](02-inicio.png) |
| 3 | Solicitação | `/solicitacao?id=hospital-central` | ![Solicitação](03-solicitacao.png) |
| 4 | Nova solicitação | `/nova-solicitacao` | ![Nova solicitação](04-nova-solicitacao.png) |
| 5 | Campanhas | `/campanhas` | ![Campanhas](05-campanhas.png) |
| 6 | Histórico | `/historico` | ![Histórico](06-historico.png) |
| 7 | Pré-requisitos | `/pre-requisitos` | ![Pré-requisitos](07-pre-requisitos.png) |

As imagens mostram a parte superior de cada tela, com o aplicativo sem conta (dados de exemplo), e foram capturadas em 04/11/2026.

## Fluxos

```
Fluxo principal:    Cadastro (1) → Início (2) → Solicitação (3)
Pedir sangue:       Início (2) → Nova solicitação (4) → Início (2)
Aptidão:            Início (2) → Pré-requisitos (7)
Intervalo de doação: Histórico (6) → Pré-requisitos (7)
Campanhas:          Início (2) → Campanhas (5)
```

Mapa Model, View e Controller de cada fluxo: [`../docs/arquitetura-mvc-camadas.md`](../docs/arquitetura-mvc-camadas.md).

## Limites do protótipo

Solicitações, campanhas, doações, hemograma e distâncias de exemplo são fictícios. Notificação, biometria e "Confirmar interesse" são demonstrações. Escopo completo: [`../docs/escopo.md`](../docs/escopo.md).
