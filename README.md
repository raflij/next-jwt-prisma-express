# Next.js Expres JS JWT
- Front-end: Next.js
- Backend API server: Express.js
- Data: PostgeSQL managed by Supabase
- Database ORM: Prisma
- JSON Web Tokens (JWT)

## Install
`npm install` to setup dependencies

## .Env
`Client`
Create a `.env` file with `NEXT_PUBLIC_API_URL` (see env.example)

`Server`
Create a `.env` file with `DATABASE_URL` (see env.example)

## Dev

`npx prisma migrate dev --name init` Prisma create a new migration

`npm run dev` to run client on port 3000

`npm run dev` to run server on port 3001

## Demo

[https://test-nextjs-express-jwt.vercel.app/](https://test-nextjs-express-jwt.vercel.app/)