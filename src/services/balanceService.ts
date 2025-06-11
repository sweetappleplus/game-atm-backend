import { pool } from "../db";

export const getBalanceService = async (userId: number) => {
  try {
    const res = await pool.query(
      "SELECT amount FROM balances WHERE user_id = $1",
      [userId]
    );
    if (res.rows.length === 0) {
      throw new Error("User not found");
    }
    return Number(res.rows[0].amount);
  } catch (error) {
    throw error;
  }
};
