# Arquitetura em camadas e padrão MVC — ConectaSangue

Complementa [`monolito-modular.md`](monolito-modular.md). Aqui está o mapa de onde cada responsabilidade vive no código atual e onde ela ainda está misturada.

## 1. As 4 camadas

| Camada | O que contém | Onde está no repositório |
|---|---|---|
| Apresentação | Telas, navegação, rótulos e feedback visual | `src/routes/*.tsx` (JSX), `src/components/BottomNav.tsx`, `src/components/ui/` |
| Aplicação | Casos de uso e sequência das ações do usuário | Funções dentro das telas: `submit`, `choose`, `remove`, `signOut`, `setConfirmed` |
| Domínio | Entidades, regras de negócio e restrições | `src/lib/blood.ts` (`canDonate`, `donationRules`, `normalizeType`, `timeAgo`) |
| Infraestrutura | Dados e serviços externos | `src/integrations/supabase/` (conta, tabelas `donor_profiles`, `blood_requests`, `campaigns`) e dados fictícios (`sampleRequests`, listas de exemplo) |

**Regra de ouro adotada:** a tela não guarda a regra de negócio como texto solto. A regra precisa existir em código que não dependa de cor, posição ou nome de botão.

### Conferência da regra de ouro (estado atual)

| Regra | Onde está | Situação |
|---|---|---|
| Compatibilidade entre tipos sanguíneos (ABO/Rh) | `canDonate` em `src/lib/blood.ts` | Cumpre. A tela de solicitação só chama a função. |
| Intervalo entre doações (90 dias mulheres, 60 dias homens) | `donationRules` em `src/lib/blood.ts` | Cumpre. A tela de histórico só lê a regra. |
| Idade de 16 a 69 anos e peso mínimo de 50 kg | Dentro de `src/routes/pre-requisitos.tsx` | **Não cumpre.** Os limites e a lista de perguntas (`checks`) estão na tela. |
| Senha com no mínimo 6 caracteres | Atributo `minLength` do campo em `src/routes/index.tsx` | Não cumpre. A regra só existe no campo de formulário. |
| Tipo "Hospital ou banco" não pode publicar solicitação | Botão desabilitado em `src/routes/nova-solicitacao.tsx` | Não cumpre. A regra depende do botão. |

Essas três pendências são a manutenção preventiva descrita em [`manutencao.md`](manutencao.md).

## 2. Padrão MVC aplicado ao projeto

| Papel | No ConectaSangue |
|---|---|
| **Model** (o cérebro) | Tipos e regras de `src/lib/blood.ts` (`RequestView`, `Sex`, `canDonate`, `donationRules`) e as três tabelas do Supabase: `donor_profiles` (nome, e-mail, bairro e cidade, tipo sanguíneo, sexo), `blood_requests` (tipo, urgência, local, paciente, tipo de solicitante) e `campaigns` (título, mensagem). |
| **View** (o rosto) | Cada tela em `src/routes/`: cadastro (`index`), `inicio`, `solicitacao`, `nova-solicitacao`, `campanhas`, `historico` e `pre-requisitos`, além da `BottomNav`. |
| **Controller** (o maestro) | As ações que ligam a tela ao dado: criar conta e entrar, confirmar interesse, salvar solicitação, publicar e excluir campanha, escolher sexo, verificar pré-requisitos, sair. |

Nota honesta: neste protótipo o Controller não é um arquivo separado. As ações ficam dentro do componente da tela, ao lado do JSX. O mapeamento abaixo mostra qual ação cumpre o papel de Controller em cada fluxo.

## 3. Mapa dos fluxos principais

Formato exigido: qual Model é alterado → qual View é exibida → qual ação (Controller) dispara a mudança.

| # | Fluxo | Model alterado | View exibida | Ação (Controller) |
|---|---|---|---|---|
| 1 | Cadastro do doador | Conta de usuário + `donor_profiles` | Cadastro (`/`) → Início (`/inicio`) | `submit` (modo cadastro) |
| 2 | Entrar | Sessão do usuário | Cadastro em modo "entrar" → Início | `submit` (modo login) |
| 3 | Ver compatibilidade de uma solicitação | Nenhum (leitura de `blood_requests` e do tipo do doador) | Início → Solicitação (`/solicitacao?id=`) | Toque no cartão da solicitação; `canDonate` calcula o resultado |
| 4 | Confirmar interesse em doar | Estado local (`confirmed`). Nada é gravado nem enviado. | Solicitação | `setConfirmed(true)` ("Confirmar interesse") |
| 5 | Pedir sangue | `blood_requests` (nova linha) | Nova solicitação → Início | `submit` de `nova-solicitacao` |
| 6 | Publicar campanha | `campaigns` (nova linha) | Campanhas | `submit` de `campanhas` |
| 7 | Excluir campanha | `campaigns` (linha removida) | Campanhas | `remove` |
| 8 | Ver intervalo entre doações | `donor_profiles.sex` | Histórico | `choose` (Feminino ou Masculino) |
| 9 | Pré-triagem "Posso doar hoje?" | Nenhum (cálculo local) | Pré-requisitos | `submit` do formulário de pré-triagem |
| 10 | Sair | Sessão encerrada | Início → Cadastro | `signOut` |

## 4. Fronteiras entre camadas hoje

- As telas chamam o Supabase diretamente (`supabase.from(...)`). Isso mistura Apresentação e Infraestrutura. Já estava registrado como "limite atual" no `monolito-modular.md`.
- A conversão da linha do banco para `RequestView` está repetida em `inicio.tsx` e `solicitacao.tsx`. Se o banco mudar, os dois arquivos precisam mudar juntos.
- Próximo passo planejado: criar uma camada de serviço (por exemplo `src/services/`) que concentre o acesso ao Supabase e a conversão para `RequestView`, e mover as regras de pré-triagem para `src/lib/`. As telas passam a chamar só funções.
