# Telas 3 e 4 do ConectaSangue

## O que será feito
- Criar a tela **Solicitação de doação** conforme a tela 3 do PDF, com detalhes do Hospital Central, compatibilidade, confirmação de interesse e opção de voltar.
- Criar a tela **Nova solicitação** conforme a tela 4 do PDF, com escolha do solicitante, tipo sanguíneo, urgência, local, paciente e publicação.
- Ligar o pedido do Hospital Central da tela Início ao detalhe e ativar **Pedir sangue** na navegação inferior.
- Manter solicitações e confirmações claramente marcadas como demonstração, sem apresentá-las como informações reais verificadas.

## Comportamento
- **Confirmar interesse** mostrará uma confirmação local de demonstração; **Agora não** voltará ao início.
- **Publicar solicitação** validará os campos e mostrará sucesso local de demonstração, sem criar um pedido real no banco.
- As telas conservarão cores, fonte, dimensões e hierarquia visual do PDF em celular e computador.

## Verificação
- Conferir as duas telas e seus caminhos de navegação em tamanhos de celular e computador.
- Testar botões, seletores, validação do formulário e mensagens de demonstração.
- Confirmar que a prévia permanece sem erros.

## Detalhes técnicos
- Adicionar rotas próprias para `/solicitacao` e `/nova-solicitacao` com metadados exclusivos.
- Reutilizar os componentes e tokens visuais já existentes; não haverá alteração no cadastro nem criação de dados reais de solicitações.
