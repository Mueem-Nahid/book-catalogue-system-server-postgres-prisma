## Book Catalogue System Server (PostgreSQL, Prisma)

## Live Link:  [https://book-catalogue-server-postgres-prisma.vercel.app/api/v1](https://book-catalogue-server-postgres-prisma.vercel.app/api/v1)

### Application Routes:

#### User

- https://book-catalogue-server-postgres-prisma.vercel.app/api/v1/auth/signup (POST)
- https://book-catalogue-server-postgres-prisma.vercel.app/api/v1/auth/login (POST)
- https://book-catalogue-server-postgres-prisma.vercel.app/api/v1/users (GET)
- https://book-catalogue-server-postgres-prisma.vercel.app/api/v1/users/752d1b82-21ce-46fe-ba9f-60528ba5b97f (Single
  GET)
- https://book-catalogue-server-postgres-prisma.vercel.app/api/v1/users/752d1b82-21ce-46fe-ba9f-60528ba5b97f (PATCH)
- https://book-catalogue-server-postgres-prisma.vercel.app/api/v1/users/6da358cc-3b05-47a6-a75f-73b92c987951 (DELETE)
- https://book-catalogue-server-postgres-prisma.vercel.app/api/v1/profile (GET)

### Category

- https://book-catalogue-server-postgres-prisma.vercel.app/api/v1/categories/create-category (POST)
- https://book-catalogue-server-postgres-prisma.vercel.app/api/v1/categories (GET)
- https://book-catalogue-server-postgres-prisma.vercel.app/api/v1/categories/195dad0c-dfec-4d7c-afbf-e3d19bcae966 (
  Single GET)
- https://book-catalogue-server-postgres-prisma.vercel.app/api/v1/categories/195dad0c-dfec-4d7c-afbf-e3d19bcae966 (
  PATCH)
- https://book-catalogue-server-postgres-prisma.vercel.app/api/v1/categories/94583c39-7a2c-48c1-b12f-c078703560ee (
  DELETE)

### Books

- https://book-catalogue-server-postgres-prisma.vercel.app/api/v1/books/create-book (POST)
- https://book-catalogue-server-postgres-prisma.vercel.app/api/v1/books (GET)
- https://book-catalogue-server-postgres-prisma.vercel.app/api/v1/books/c59fcbc1-b8c0-4f55-b27e-11d3d63b5105/category (
  GET)
- https://book-catalogue-server-postgres-prisma.vercel.app/api/v1/books/f02d71c0-117b-4418-bcce-8f51d8f95fec (GET)
- https://book-catalogue-server-postgres-prisma.vercel.app/api/v1/books/f02d71c0-117b-4418-bcce-8f51d8f95fec (PATCH)
- https://book-catalogue-server-postgres-prisma.vercel.app/api/v1/books/f02d71c0-117b-4418-bcce-8f51d8f95fec (DELETE)

### Orders

- https://book-catalogue-server-postgres-prisma.vercel.app/api/v1/orders/create-order (POST)
- https://book-catalogue-server-postgres-prisma.vercel.app/api/v1/orders (GET)
- https://book-catalogue-server-postgres-prisma.vercel.app/api/v1/orders/c96efd67-d7dc-4f18-863f-53f18ad72b11 (GET)

### Technology:

- TypeScript
- NodeJs
- ExpressJs
- PostgreSQL
- Prisma