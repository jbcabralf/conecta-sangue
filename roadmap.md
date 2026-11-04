# Roadmap

## Protótipo (telas)

- [x] Reproduzir a tela 1 (cadastro) com visual do PDF e cadastro persistente.
- [x] Reproduzir a tela 2 (início) com dados do protótipo claramente identificados como exemplos.
- [x] Reproduzir a tela 3 (detalhe e confirmação) e conectar à tela inicial.
- [x] Reproduzir a tela 4 (nova solicitação) com formulário funcional de demonstração.
- [x] Conferir as telas 3 e 4 em celular e computador e validar erros da prévia.
- [x] Tela 5 (campanhas) com publicação salva.
- [x] Tela 6 (histórico) com intervalo de doação por sexo.
- [x] Diferenciar avisos de validação entre hospital/banco e familiar, e apresentar o campo de biometria antes de publicar sem simular uma validação real.

## Caminho crítico da entrega

- [x] 1. Consolidar o problema herdado e os limites de escopo ([`docs/escopo.md`](docs/escopo.md)).
- [x] 2. Definir camadas, Models, Views e Controllers ([`docs/arquitetura-mvc-camadas.md`](docs/arquitetura-mvc-camadas.md)).
- [x] 3. Justificar a arquitetura de monolito modular ([`docs/monolito-modular.md`](docs/monolito-modular.md)).
- [x] 4. Montar os fluxos de tela navegáveis ([`docs/fluxos-de-tela.md`](docs/fluxos-de-tela.md), [`prototipo/`](prototipo/README.md)).
- [x] 5. Revisar as telas pelas métricas de qualidade ([`docs/metricas-de-qualidade.md`](docs/metricas-de-qualidade.md)).
- [x] 6. Versionar cada incremento via Git: branch, commit e PR.
- [x] 7. Escrever a documentação de produção referenciando commits ([`docs/producao-passo-a-passo.md`](docs/producao-passo-a-passo.md)).
- [x] 8. Produzir manuais, pitch e canvas ([`manuais/`](manuais/manual-do-usuario.md), [`pitch/`](pitch/Pitch.md)).
- [ ] 9. Publicar o repositório público e verificar acessos. Mantido privado por decisão do grupo, por enquanto.

## Próximos passos de manutenção

Origem: [`docs/metricas-de-qualidade.md`](docs/metricas-de-qualidade.md) e [`docs/manutencao.md`](docs/manutencao.md).

- [ ] Confirmar antes de excluir uma campanha (corretiva).
- [ ] Conferir as regras de acesso do Supabase e o conteúdo do `.env` (corretiva). Obrigatório antes do passo 9.
- [ ] Mover as regras de pré-triagem para `src/lib/` (preventiva).
- [ ] Criar uma camada de serviço entre as telas e o Supabase (preventiva).
- [ ] Mensagem de estado vazio nas listas (perfectiva).
- [ ] Unificar `familiar`/`family` e `−`/`-` (perfectiva).
- [ ] Origem a confirmar da tela de pré-requisitos no `escopo.md`.
