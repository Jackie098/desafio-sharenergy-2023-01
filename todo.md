## TODO
[] - Frontend
#### LOGIN
  [X] - O usuário deve ser capaz de se autenticar com LOGIN -> desafiosharenergy e SENHA -> sh@r3n3rgy
    [X] - Utilizar JWT
    [X] - Manter sessão no LocalStorage
    [X] - Criar botão "remember me" para login automático
      <!-- [] - Gerar um hash da senha, salvar no localStorage e quando "remember me" estiver true, traduzir o hash e colocar no campo de senha -->

#### TELA HOME
  [X] - Deve haver um navbar com as opções das outras 3 telas
  [X] - Deve conter uma listagem de usuários gerada a partir da API [Random User Generator](https://randomuser.me/)
  [X] - Os itens devem possuir
    - Foto do usuário
    - Nome completo
    - Email
    - username
    - idade
  [X] - Campo de buscar usuários por nome, email ou username

#### TELA CATS
  [X] - Buscar gatos por CODE http - [HTTP Cat](https://http.cat/)
  [X] - Exibir o gato 
  
#### TELA DOGS
  [X] - Criar botão refresh para mudar o cachorro que está sendo exibido aleatoriamente

#### TELA CUSTOMERS
  [X] - Exibir lista de clientes
  [X] - Cadastrar novos
    [X] - deve posuir
      - nome
      - email
      - telefone
      - endereco
      - cpf
  [X] - Visualizar informações de um cliente especifico
  [X] - Editar cliente
  [X] - Apagar cliente


[X] - Backend
  [X] - Criar acesso com banco mongo
  [X] - Criar entidades
  [X] - Persistir a senha do usuário adm
  [X] - CRUD novos usuários
    [X] - LISTAR users
    [X] - CRIAR user
    [X] - UPDATE user
    [X] - DELETE user