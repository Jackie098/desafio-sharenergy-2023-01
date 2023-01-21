## Desafio ShareEnergy 2023/01
#### Tecnologias utilizadas
- React (frontend)
  - Typescript
  - React Query
  - Formik
  - Mui 5
  - Yup
  - JWT
  - Vite
- Node (backend)
  - Typescript
  - Express
  - MongoDB
  - Mongoose
  - Yup
  - JWT

#### Instalando a aplicação
 O repositório está separado majoritariamente em dois diretórios raízes: **web** e **server**. E para executar a aplicação você precisa iniciar dois servidores, um para o frontend e outro para o backend.

 ##### Passo 1 - Frontend
  - `yarn ` - Rode este comando para baixar as dependências. OBS: Caso opte por isso, use o `npm`.
  - Após isso, basta executar `yarn dev` que a sua aplicação *vite* será executada na porta 5173 ou no link **http://localhost:5173**.

##### Passo 2 - Backend
 No backend possuímos algumas variáveis ambientes, então antes de mais nada você vai precisar configurar as seguintes variáveis no seu arquivo *".env"*.

 `AUTH_CONFIG_SECRET` - Este carinha é o **secret** do seu token jwt, preencha-o com alguma string grande e complexa.

Como o banco é remoto, você precisará das credenciais do mesmo.
 `BD_USER` - Esta variávei deve ser preenchida com o usuário do banco.
 `BD_PASSWORD`- Senha root da conta
 `BD_CLUSTER` - Nome do cluster
 [MongoDb Atlas](https://account.mongodb.com/account/login?signedOut=true)

 `PORT` - Insira a porta desejada para rodar o servidor *express*. Sugestão: *porta **3333***

 Após configurar as variáveis ambiente, certifique-se de estar no diretório **/server**, instale as dependências com `yarn` ou `npm -i` e em seguinda, rode o seguinte comando no terminal:
 `yarn dev` ou `npm run dev`.

 Agora você deve ser capaz de utilizar a aplicação a partir da página de **LOGIN** através do navegador.