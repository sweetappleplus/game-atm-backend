import { pool } from "../db";

export const createUserService = async (username: string) => {
  const result = await pool.query(
    "INSERT INTO users (username) VALUES ($1) RETURNING *",
    [username]
  );
  return result.rows[0];
};

export const getUserBalanceService = async (
  userId: number
): Promise<number> => {
  const result = await pool.query(
    `
    SELECT COALESCE(SUM(
      CASE
        WHEN type = 'deposit' AND to_user_id = $1 THEN amount
        WHEN type = 'withdraw' AND from_user_id = $1 THEN -amount
        WHEN type = 'transfer' AND to_user_id = $1 THEN amount
        WHEN type = 'transfer' AND from_user_id = $1 THEN -amount
        ELSE 0
      END
    ), 0) AS balance
    FROM transactions
    `,
    [userId]
  );

  return parseFloat(result.rows[0].balance);
};

export const depositService = async (userId: number, amount: number) => {
  const result = await pool.query(
    "INSERT INTO transactions (to_user_id, type, amount) VALUES ($1, $2, $3) RETURNING *",
    [userId, "deposit", amount]
  );
  return result.rows[0];
};

export const withdrawService = async (userId: number, amount: number) => {
  const result = await pool.query(
    "INSERT INTO transactions (from_user_id, type, amount) VALUES ($1, $2, $3) RETURNING *",
    [userId, "withdraw", amount]
  );
  return result.rows[0];
};

export const transferService = async (
  fromUserId: number,
  toUserId: number,
  amount: number
) => {
  const result = await pool.query(
    "INSERT INTO transactions (from_user_id, to_user_id, type, amount) VALUES ($1, $2, $3, $4) RETURNING *",
    [fromUserId, toUserId, "transfer", amount]
  );
  return result.rows[0];
};

export const getHistoryService = async (userId: number) => {
  const result = await pool.query(
    `SELECT * FROM transactions
     WHERE from_user_id = $1 OR to_user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};
