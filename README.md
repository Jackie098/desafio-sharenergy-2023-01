## TODO
[] - Frontend
--> LOGIN
  [] - O usuário deve ser capaz de se autenticar com LOGIN -> desafiosharenergy e SENHA -> sh@r3n3rgy
    [] - Utilizar JWT
    [] - Manter sessão no LocalStorage
    [] - Croar botão "remember me" para login automático

--> TELA HOME
  [] - Deve haver um navbar com as opções das outras 3 telas
  [] - Deve conter uma listagem de usuários gerada a partir da API [Random User Generator](https://randomuser.me/)
  [] - Os itens devem possuir
    - Foto do usuário
    - Nome completo
    - Email
    - username
    - idade
  [] - Campo de buscar usuários por nome, email ou username

--> TELA CATS
  [] - Buscar gatos por CODE http - [HTTP Cat](https://http.cat/)
  [] - Exibir o gato 
  
--> TELA DOGS
  [] - Criar botão refresh para mudar o cachorro que está sendo exibido aleatoriamente

--> TELA USERS
  [] - Exibir lista de clientes
  [] - Cadastrar novos
    [] - deve posuir
      - nome
      - email
      - telefone
      - endereco
      - cpf
  [] - Visualizar informações de um cliente especifico
  [] - Editar cliente
  [] - Apagar cliente


[] - Backend
  [] - Criar acesso com banco mongo
  [] - Criar entidades
  [] - Persistir a senha do usuário adm
  [] - CRUD novos usuários
    [] - LISTAR users
    [] - CRIAR user
    [] - UPDATE user
    [] - DELETE user