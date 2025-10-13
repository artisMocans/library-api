# Library API (Node.js + Express + MongoDB)

A minimal REST API for managing books in a library. Built with Node.js (CommonJS), Express, and MongoDB via Mongoose. Includes a health check and full CRUD on /books.

---

## Tech Stack
- Runtime: Node.js (CommonJS)
- Web framework: Express 5.x
- Database ODM: Mongoose 8.x
- Database: MongoDB (local via Homebrew/Docker or cloud via Atlas)
- Env management: dotenv 
- CORS & logging: cors, morgan 
- Dev tooling: nodemon (hot reload)

---

## Endpoints
- `GET /health` — service health check 
- `POST /books` — create a book 
- `GET /books` — list all books 
- `GET /books/:id` — get a single book by id 
- `PUT /books/:id` — update a book (full replace of fields)
- `DELETE /books/:id` — delete a book

### Book schema (per assignment):
```
{
  name: String,
  author: String,
  year: String,       // kept as String as required by the task
  available: Number   // non-negative integer
}
```

--- 

## Project structure
```
.
├─ .env
├─ package.json
├─ src/
│  ├─ server.js
│  ├─ db.js
│  ├─ models/
│  │  └─ Book.js
│  └─ router/
│     └─ Books.js
```

---

## Prerequisites
- Node.js >= 18
- npm 
- A running MongoDB instance

### MongoDB via Homebrew (macOS)
```
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0

# Stop later:
# brew services stop mongodb-community@7.0
```

---

## Setup & Run
1. **Install dependencies:** `npm install`
2. **Create `.env`**
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/library
```
3. **Scripts**
```
"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon --watch src src/server.js"
}
```
4. **Run**
```
npm run dev
```
**You should see logs**
```
Successfully connected to MongoDB at localhost:27017
Server listening on http://localhost:3000
```