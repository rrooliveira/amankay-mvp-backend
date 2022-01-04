# Project Amankay - Nodejs (Backend)

## Commands to execute the application
- npm install
- npm run dev
- duplicate and rename .env.example to .env

## Create container with Postgres database
```
docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```