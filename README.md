# Y Social Network (Em desenvolvimento)

Projeto em Typescript que utiliza  NextJS, ReactJS, Typescript, Tailwind, NodeJS, Express e MySQL para criar um rede social moderna e fácil de usar.

<div style=display: flex>
  <img width=100% src="https://github.com/gabrielmjacques/y-social-network/assets/107326349/77802904-a9c9-49a7-bb0b-045460d67443"/>
  <hr>
  
  <img width=49.9% src="https://github.com/gabrielmjacques/y-social-network/assets/107326349/4fbee469-2f13-46b7-bd6c-4fe74bbf52cd"/>
  <img width=49% src="https://github.com/gabrielmjacques/y-social-network/assets/107326349/140d9a44-0f99-4b92-abbb-13a182e22783"/>
</div>

## Tecnologias Usadas

- [NextJS](https://nextjs.org/)
- [React](https://react.dev/) 
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind](https://tailwindcss.com/)
- [NodeJS](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)

## Requisitos para execução
- [NodeJS](https://nodejs.org/en)
- [MySQL](https://www.mysql.com/)

## Configuração

1. Clone o repositório:
```git
git clone https://github.com/gabrielmjacques/y-social-network.git
```

---

2. Configure o banco de dados MySQL:

- Crie o banco de dados do projeto utilizando o [MySQL Workbench](https://www.mysql.com/products/workbench/) (Modelo de Entidade e Relacionamento na pasta raiz do projeto como `db_model.mwb`).

---

3. Configure o server:

- Altere os valores das variáveis de ambiente no arquivo `server/.env.exemple`
- Renomeie o arquivo para `.env`

---

4. Configure o client:

- Altere os valores das variáveis de ambiente do arquivo `client/.env_exemple` com base na URL do servidor (`http://localhost:(PORTA CONFIGURADA NO .env DO SERVER)/api`)
- Renomeie o arquivo para `.env`

---

5. Instale as dependências:

- Abra dois terminais.
  - Primeiro terminal na pasta ``client`` do projeto.
  - Segundo terminal na pasta ``server`` do projeto.
  
* Em ambos os terminais, execute o comando:
```
npm install
```

---

6. Execute o projeto:

- Em cada um dos terminais, execute o comando:
```
npm run dev  
```

---
