import { pool } from "../db";
import { getBalanceService } from "./balanceService";

export const depositMoneyService = async (userId: number, amount: number) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(
      "UPDATE balances SET amount = amount + $1 WHERE user_id = $2",
      [amount, userId]
    );

    await client.query(
      "INSERT INTO transactions (type, to_user_id, amount) VALUES ($1, $2, $3)",
      ["deposit", userId, amount]
    );

    await client.query("COMMIT");
    return await getBalanceService(userId);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const withdrawMoneyService = async (userId: number, amount: number) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const balanceRes = await client.query(
      "SELECT amount FROM balances WHERE user_id = $1",
      [userId]
    );
    const currentBalance = balanceRes.rows[0].amount;

    if (amount > currentBalance) {
      throw new Error("Insufficient funds");
    }

    await client.query(
      "UPDATE balances SET amount = amount - $1 WHERE user_id = $2",
      [amount, userId]
    );

    await client.query(
      "INSERT INTO transactions (type, from_user_id, amount) VALUES ($1, $2, $3)",
      ["withdraw", userId, amount]
    );

    await client.query("COMMIT");
    return await getBalanceService(userId);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const transferMoneyService = async (
  fromUserId: number,
  toUserId: number,
  amount: number
) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const fromBalanceRes = await client.query(
      "SELECT amount FROM balances WHERE user_id = $1",
      [fromUserId]
    );
    const fromUserBalance = fromBalanceRes.rows[0].amount;

    if (fromUserBalance < amount) {
      throw new Error("Insufficient funds");
    }

    await client.query(
      "UPDATE balances SET amount = amount - $1 WHERE user_id = $2",
      [amount, fromUserId]
    );
    await client.query(
      "UPDATE balances SET amount = amount + $1 WHERE user_id = $2",
      [amount, toUserId]
    );

    await client.query(
      "INSERT INTO transactions (type, from_user_id, to_user_id, amount) VALUES ($1, $2, $3, $4)",
      ["transfer", fromUserId, toUserId, amount]
    );

    await client.query("COMMIT");
    return {
      fromUserBalance: fromUserBalance - amount,
      toUserBalance: await getBalanceService(toUserId),
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const getTransactionHistoryService = async (userId: number) => {
  try {
    const res = await pool.query(
      "SELECT type, amount, created_at FROM transactions WHERE from_user_id = $1 OR to_user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    return res.rows;
  } catch (error) {
    throw error;
  }
};
