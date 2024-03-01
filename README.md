# Y Social Network (Em desenvolvimento)

Projeto em Typescript que utiliza  NextJS, ReactJS, Typescript, Tailwind, MySQL para criar um rede social moderna e fácil de usar.

<div style=display: flex>
  <img width=100% src="https://github.com/gabrielmjacques/y-social-network/assets/107326349/77802904-a9c9-49a7-bb0b-045460d67443"/>
  <hr>
  <img width=49% src="https://github.com/gabrielmjacques/y-social-network/assets/107326349/138f9660-35ff-43bc-898d-d6f47e950431"/>
  <img width=49.9% src="https://github.com/gabrielmjacques/y-social-network/assets/107326349/3a5377a3-34ad-4666-b9ca-e96b77bb2afe"/>
</div>

## Tecnologias Usadas

- [NextJS](https://nextjs.org/)
- [React](https://react.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind](https://tailwindcss.com/)
- [MySQL](https://www.mysql.com/)

## Configuração

1. Clone o repositório:
```git
git clone https://github.com/gabrielmjacques/y-social-network.git
```

2. Configure o banco de dados MySQL:

- Crie um banco de dados no MySQL para o projeto (Modelo de Entidade e Relacionamento na pasta raiz do projeto como `db_model.mwb`).

3. Configure o server:

- Altere os valores das variáveis de ambiente no arquivo `server/.env.exemple`
- Renomeie o arquivo para `.env`

4. Configure o client:

- Altere os valores das variáveis de ambiente do arquivo `client/.env_exemple` com base na URL do servidor (`http://localhost:(PORTA CONFIGURADA EM server/.env.exemple)`)
- Renomeie o arquivo para `.env`

5. Execute o aplicativo:

- Abra dois terminais, um na pasta `client` e outro na pasta `server`
- Em cada um dos terminais execute o seguinte comando:
```
npm run dev
```
