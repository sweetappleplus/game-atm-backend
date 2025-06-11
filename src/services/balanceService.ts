import { pool } from "../db";

export const getBalanceService = async (userId: number) => {
  const res = await pool.query(
    "SELECT amount FROM balances WHERE user_id = $1",
    [userId]
  );
  if (res.rows.length === 0) {
    throw new Error("User not found");
  }
  return res.rows[0].amount;
};
