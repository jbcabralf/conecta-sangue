# ConectaSangue

Aplicativo que avisa doadores de sangue quando alguém perto deles precisa do seu tipo sanguíneo.

**Protótipo publicado:** https://conecta-sangue.lovable.app

Projeto acadêmico de primeiro período (Ciência da Computação). O protótipo foi criado no Lovable e este repositório é a entrega versionada: código, decisões de arquitetura, histórico de produção, manuais, pitch e canvas.

## Mapa do repositório

| Quero... | Vá para |
|---|---|
| Testar o protótipo sem conta | [`prototipo/README.md`](prototipo/README.md) (link, telas, exportações e fluxos) |
| Entender o problema e o que está dentro e fora do escopo | [`docs/escopo.md`](docs/escopo.md) |
| Ver a arquitetura em camadas e o MVC | [`docs/arquitetura-mvc-camadas.md`](docs/arquitetura-mvc-camadas.md) |
| Ver os requisitos e o que o protótipo atende | [`docs/requisitos.md`](docs/requisitos.md) |
| Ver por que monolito modular e não microsserviços | [`docs/monolito-modular.md`](docs/monolito-modular.md) |
| Navegar pelos fluxos de tela | [`docs/fluxos-de-tela.md`](docs/fluxos-de-tela.md) |
| Ver a revisão de qualidade das telas | [`docs/metricas-de-qualidade.md`](docs/metricas-de-qualidade.md) |
| Ver os tipos de manutenção e o custo do caos | [`docs/manutencao.md`](docs/manutencao.md) |
| Ver como o projeto foi produzido, ligado aos commits | [`docs/producao-passo-a-passo.md`](docs/producao-passo-a-passo.md) |
| Aprender a usar o aplicativo | [`manuais/manual-do-usuario.md`](manuais/manual-do-usuario.md) |
| Rodar, alterar e manter o código | [`manuais/manual-tecnico.md`](manuais/manual-tecnico.md) |
| Ler a apresentação do produto | [`pitch/Pitch.md`](pitch/Pitch.md) |
| Ver a síntese de problema, canais e riscos | [`pitch/Canvas.md`](pitch/Canvas.md) |
| Ver o plano e o andamento | [`roadmap.md`](roadmap.md) |

## Estrutura

```
README.md       este mapa
docs/           escopo, requisitos, arquitetura, qualidade, manutenção e produção
manuais/        manual do usuário e manual técnico
pitch/          Pitch.md e Canvas.md
prototipo/      link público, telas, exportações e fluxos
src/            código da aplicação (rotas, componentes, regras e integração com o Supabase)
supabase/       configuração do Supabase
```

## Como rodar localmente

Requisitos: Node.js e npm.

```
git clone <url-do-repositorio>
cd conecta-sangue
npm i
npm run dev
```

Mais comandos, regras de versionamento e a sincronização com o Lovable estão no [manual técnico](manuais/manual-tecnico.md).

## Como contribuir

Toda mudança entra por branch e pull request, com revisão de outro integrante antes do merge. Detalhes na seção 7 do [manual técnico](manuais/manual-tecnico.md).

## Aviso

O protótipo usa dados de exemplo e ações demonstrativas (notificações, biometria, confirmação de interesse). É informativo: a triagem oficial para doar é feita presencialmente no serviço de hemoterapia. Use apenas dados fictícios.
