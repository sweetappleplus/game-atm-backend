# 🏦 Game ATM Backend

A backend API for managing in-game ATM operations including deposits, withdrawals, balance inquiries, transaction history, and peer-to-peer transfers. Built with **TypeScript**, **Express**, **PostgreSQL**, and **pure SQL** (no ORM).

---

## 🚀 Tech Stack

- **Language**: TypeScript
- **Framework**: Express
- **Database**: PostgreSQL
- **SQL**: Native queries via `pg`
- **Documentation**: Swagger UI

---

## 📁 Project Structure

```
src/
├── controllers/      # API controllers
├── db/               # PostgreSQL connection setup
├── middlewares/      # Middleware
├── models/           # (optional) Schema definitions
├── routes/           # Route definitions
├── scripts/          # SQL schema init
├── services/         # Business logic
├── utils/            # helpers including validation
├── index.ts          # Entry point
docs/
└── swagger.yaml      # Swagger API docs
sql/
└── schema.sql        # SQL schema file for migration
```

---

## 🛠 Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/sweetappleplus/game-atm-backend.git
cd game-atm-backend
npm install
```

### 2. Setup PostgreSQL

Create user and database:

```sql
CREATE DATABASE atm_game OWNER <postgreSQL username>;
```

Update your `.env`:

```env
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=<postgreSQL username>
DB_PASSWORD=<postgreSQL userpassword>
DB_NAME=atm_game
```

### 3. Run DB Migration

```bash
npm run migrate
```

### 4. Start Development Server

```bash
npm run dev
```

---

## 🧪 API Endpoints

| Method | Endpoint                     | Description                    |
| ------ | -----------------------------| ------------------------------ |
| POST   | `/user`                      | Create a new user              |
| GET    | `/balance/:id`               | Get current balance            |
| POST   | `/transaction/deposit`       | Deposit money                  |
| POST   | `/transaction/withdraw`      | Withdraw money                 |
| POST   | `/transaction/transfer`      | Transfer money to another user |
| GET    | `/transaction/history/:id/`  | Transaction history            |

---

## 📄 API Documentation

View Swagger docs at:

```
http://localhost:3000/api-docs
```

---

## ✅ Future Improvements

- JWT authentication
- Pagination for history
- Admin-only transaction reversal
- Rate limiting / fraud protection
- Unit tests (Jest + Supertest)

---

## 🧑 Author

Created as a test task by Maksim Shatov.

---
