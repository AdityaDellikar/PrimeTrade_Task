# PrimeTrade Dashboard

PrimeTrade is a full-stack FinTech-style dashboard with JWT authentication and CRUD task management.

## Deliverables Mapping

1. Frontend + Basic Backend hosted in GitHub repo
- Frontend: Next.js 14 + TypeScript + TailwindCSS
- Backend: Node.js + Express + TypeScript + MongoDB (Mongoose)
- Status: Completed (ready to push)

2. Functional authentication (register/login/logout with JWT)
- Register + Login APIs
- JWT issuance + protected routes
- Client-side logout and token clearing
- Status: Completed

3. Dashboard with CRUD-enabled entity
- Entity: Tasks (`title`, `description`, `status`)
- Features: create/read/update/delete, search, status filter
- Status: Completed

4. Postman collection or API docs
- API documentation provided in `API_DOCUMENTATION.md`
- Status: Completed

5. Scaling note for production
- Production scaling strategy provided in `SCALING_NOTE.md`
- Status: Completed

## Project Structure

```txt
PrimeTrade/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      utils/
      validators/
      types/
    .env.example
    package.json
    tsconfig.json

  frontend/
    app/
    components/
    context/
    hooks/
    lib/
    types/
    .env.example
    package.json
    tailwind.config.ts
    next.config.mjs

  API_DOCUMENTATION.md
  SCALING_NOTE.md
  README.md
```

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/primetrade
JWT_SECRET=replace_with_a_strong_secret
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:3000
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Run Locally

### 1) Start backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 2) Start frontend (new terminal)

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

## Build for Production

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm run build
npm start
```

## API Quick List

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users/profile`
- `PUT /api/users/profile`
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

See full details in `API_DOCUMENTATION.md`.
