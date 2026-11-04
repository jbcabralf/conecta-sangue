# Fluxos de tela navegáveis — ConectaSangue

Protótipo navegável: https://conecta-sangue.lovable.app

Tarefa central do protótipo (ver [`escopo.md`](escopo.md)): o doador se cadastra, vê as solicitações de sangue e descobre se é compatível com cada uma.

## Telas e rotas

| Tela | Rota | Como chegar | Como voltar |
|---|---|---|---|
| Cadastro / entrar | `/` | Tela inicial do app | Link "Ver início de exemplo" leva ao Início sem conta |
| Início | `/inicio` | Depois de cadastrar ou entrar; barra inferior | Barra inferior |
| Solicitação | `/solicitacao?id=` | Toque em um cartão de solicitação no Início | Botão de seta, "Agora não" ou "Voltar ao início" |
| Nova solicitação | `/nova-solicitacao` | Barra inferior | Barra inferior; após salvar, volta ao Início sozinha |
| Campanhas | `/campanhas` | "Ver todas" no Início; barra inferior | Barra inferior |
| Histórico | `/historico` | Barra inferior | Barra inferior |
| Pré-requisitos | `/pre-requisitos` | Link no cartão de aptidão (Início) ou no Histórico | Seta de voltar ao Início |

## Fluxo principal (3 telas)

```
Cadastro (/)  →  Início (/inicio)  →  Solicitação (/solicitacao)
   cria conta       lista solicitações     mostra "Você é compatível"
                                            ou "Seu tipo não é compatível"
```

Quem não quer criar conta chega ao mesmo resultado por "Ver início de exemplo": o avaliador navega o fluxo inteiro sem cadastro e sem pedir explicação à equipe.

## Fluxos secundários

**Pedir sangue.** Início → Nova solicitação → preencher tipo, urgência, local e paciente → "Salvar solicitação" → mensagem de confirmação → volta ao Início, onde a solicitação aparece em "Suas solicitações". Sem conta, a tela avisa "Entre na sua conta para salvar solicitações" com link para entrar.

**Verificar se pode doar hoje.** Início (cartão de aptidão) → Pré-requisitos → idade, peso e 7 perguntas → "Verificar" → resultado "apto" ou "melhor não doar hoje" com os motivos.

**Intervalo entre doações.** Histórico → escolher Feminino ou Masculino → aparecem o intervalo mínimo e o máximo por ano. A escolha fica salva no perfil de quem tem conta.

**Campanhas.** Campanhas → preencher título e mensagem → "Publicar campanha" → aparece em "Suas campanhas", com opção de excluir.

**Cadastro de hospital ou banco.** Cadastro → "Pessoa jurídica" → lista de documentos exigidos e botão que abre o e-mail. Não há aprovação automática (fora do escopo).

## Estados que o avaliador vai encontrar

| Situação | O que a tela mostra |
|---|---|
| Sem conta no Início | Faixa "Visualização de exemplo" com link "Cadastrar-me" |
| Solicitação inexistente | "Solicitação não encontrada." |
| Carregando | "Carregando..." na Solicitação; "Olá, ..." no Início |
| Erro ao salvar | Mensagem de erro e o formulário continua preenchido |
| Tipo incompatível | Aviso "Seu tipo não é compatível" e só o botão de voltar |
| Ação demonstrativa | Texto avisando que nada real foi enviado (notificação, biometria, interesse em doar) |

## Como testar o fluxo (passo a passo para terceiros)

1. Abra o link do protótipo.
2. Toque em "Ver início de exemplo".
3. Toque na solicitação do Hospital Central e leia o resultado de compatibilidade.
4. Volte e abra "Pré-requisitos". Preencha idade, peso e marque as perguntas.
5. Na barra inferior, abra Campanhas e Histórico.
6. Para testar salvamento (nova solicitação, campanha, sexo no histórico), crie uma conta com dados fictícios.

Use apenas dados fictícios. O projeto não deve receber dados pessoais reais.
