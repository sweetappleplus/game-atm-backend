CREATE TABLE
  users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  transactions (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) CHECK (type IN ('deposit', 'withdraw', 'transfer')),
    from_user_id INT REFERENCES users (id),
    to_user_id INT REFERENCES users (id),
    amount DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  balances (
    user_id INT PRIMARY KEY REFERENCES users (id),
    amount DECIMAL(10, 2) DEFAULT 0
  );