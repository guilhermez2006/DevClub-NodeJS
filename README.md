# DevClub-NodeJS 🚀

API REST construída com Node.js, Express e Prisma com MongoDB Atlas. Projeto em evolução contínua.

## Tecnologias

- Node.js
- Express
- Prisma (ORM)
- MongoDB Atlas

## Como rodar o projeto

### 1. Clone o repositório
```bash
git clone https://github.com/guilhermez2006/DevClub-NodeJS
cd DevClub-NodeJS
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o banco de dados
Crie um arquivo `.env` na raiz do projeto com sua connection string do MongoDB Atlas:
```
DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/NomeDoBanco?appName=nome"
```

### 4. Gere o client do Prisma
```bash
npx prisma generate
```

### 5. Rode o servidor
```bash
node --watch server.js
```

O servidor sobe em `http://localhost:3000`

## Rotas disponíveis

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /usuarios | Lista todos os usuários |
| GET | /usuarios/:id | Lista um usuário por ID |
| POST | /usuarios | Cria um novo usuário |
| PUT | /usuarios/:id | Edita um usuário |
| DELETE | /usuarios/:id | Deleta um usuário |

## Estrutura do projeto

```
├── prisma/
│   └── schema.prisma
├── routes/
│   └── usuariosRoutes.js
├── src/
│   └── Controllers/
│       └── usuariosController.js
├── .env
├── server.js
└── package.json
```