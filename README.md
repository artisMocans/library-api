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

### Option 1: Docker (Recommended for E2E testing)
- Docker Desktop installed
- Docker Compose (included with Docker Desktop)

### Option 2: Local setup
- Node.js >= 18
- npm
- A running MongoDB instance

#### MongoDB via Homebrew (macOS)
```
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0

# Stop later:
# brew services stop mongodb-community@7.0
```

---

## Setup & Run

### Option 1: Using Docker (Recommended)
**Start everything (MongoDB + API) with one command:**
```bash
 npm run docker:dev
# or
docker-compose up
```

**Rebuild and start (after Dockerfile changes):**
```bash
 npm run docker:dev:build
# or
docker-compose up --build
```

**Stop everything:**
```bash
 npm run docker:dev:down 
# or
docker-compose down
```

**Your API will be available at:** `http://localhost:3000`

**Benefits:**
- No need to manually start MongoDB
- Isolated environment
- Perfect for E2E testing
- Works the same on all machines

### Option 2: Local Development (without Docker)
1. **Install dependencies:** `npm install`
2. **Create `.env`**
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/library
```
3. **Start MongoDB** (via Homebrew or Docker)
4. **Run the app:**
```bash
npm run dev
```

**You should see logs:**
```
Successfully connected to MongoDB at localhost:27017
Server listening on http://localhost:3000
```

---

## Running E2E Tests

**Start test environment:**
```bash
npm run docker:test:up
```

This starts:
- MongoDB on port 27018 (in-memory for faster tests)
- API on port 3001

**Run your E2E tests** (against `http://localhost:3001`)

**View logs:**
```bash
npm run docker:test:logs
```

**Tear down test environment:**
```bash
npm run docker:test:down
```