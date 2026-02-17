# PrimeTrade API Documentation

Base URL: `http://localhost:5001/api`

## Authentication

Protected endpoints require:

`Authorization: Bearer <jwt_token>`

## Response Format

Success:

```json
{
  "success": true,
  "message": "...",
  "data": {}
}
```

Validation/Error example:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "path": "email",
      "message": "Invalid email"
    }
  ]
}
```

---

## Auth Endpoints

### POST `/auth/register`
Register a new user.

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

Success `201`:

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "<jwt>",
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "..."
    }
  }
}
```

### POST `/auth/login`
Login an existing user.

Request body:

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

Success `200`:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "<jwt>",
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "..."
    }
  }
}
```

---

## User Endpoints

### GET `/users/profile`
Get current user profile.

Auth required: Yes

Success `200`:

```json
{
  "success": true,
  "message": "Profile fetched successfully",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### PUT `/users/profile`
Update current user profile.

Auth required: Yes

Request body (any one or more fields):

```json
{
  "name": "John D.",
  "email": "john.d@example.com",
  "password": "newsecret123"
}
```

Success `200`:

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "...",
    "name": "John D.",
    "email": "john.d@example.com",
    "updatedAt": "..."
  }
}
```

---

## Task Endpoints

### GET `/tasks`
Get tasks for logged-in user.

Auth required: Yes

Query params:
- `search` (optional): text search on `title` and `description`
- `status` (optional): `pending` or `completed`

Example:
`GET /tasks?search=review&status=pending`

Success `200`:

```json
{
  "success": true,
  "message": "Tasks fetched successfully",
  "data": [
    {
      "_id": "...",
      "title": "Quarterly review",
      "description": "...",
      "status": "pending",
      "userId": "...",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

### POST `/tasks`
Create a task.

Auth required: Yes

Request body:

```json
{
  "title": "Quarterly review",
  "description": "Prepare reports",
  "status": "pending"
}
```

Success `201`:

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "...",
    "title": "Quarterly review",
    "description": "Prepare reports",
    "status": "pending",
    "userId": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### PUT `/tasks/:id`
Update task by ID.

Auth required: Yes

Request body (any one or more fields):

```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "status": "completed"
}
```

Success `200`:

```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "_id": "...",
    "title": "Updated task title",
    "description": "Updated description",
    "status": "completed",
    "userId": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### DELETE `/tasks/:id`
Delete task by ID.

Auth required: Yes

Success `200`:

```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

## Health Check

### GET `/health`

Success `200`:

```json
{
  "success": true,
  "message": "PrimeTrade API is running"
}
```

---