# viacep-integration

Este projeto realiza integração com a API do [ViaCEP](https://viacep.com.br/) para consulta e persistência de endereços em um banco de dados PostgreSQL.

### ✅ Endpoints disponíveis

- GET /ceps/:cep
- GET /ceps/
- POST /ceps/:cep/favorite
- PUT /ceps/:cep

### 🛠 Tecnologias utilizadas

- [Node.js](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)

### 🚀 Como rodar o projeto

```bash
# Clone este repositório
$ git clone https://github.com/LucianoRib5/viacep-integration.git

# Acesse a pasta do projeto no terminal/cmd
$ cd viacep-integration

# Instale as dependências
$ yarn ou npm install

# Crie um arquivo .env na raiz do projeto, com as seguintes variáveis:
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/veek"
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=veek

# Suba o container do banco de dados com Docker
$ docker-compose up -d

# Sincronize os dados com a API do ViaCEP
$ yarn run sync

# Execute o script dev
yarn run dev

# O servidor iniciará na porta:3000.
```

### Autor
---
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/89327618?v=4" width="100px;" alt=""/>
 
 <sub><b>Luciano Ribeiro</b></sub>


Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Luciano-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tgmarinho/)](https://www.linkedin.com/in/luciano-ribeiro-santos/)
