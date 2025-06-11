import { pool } from "../db";

export const createUserService = async (username: string) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const res = await client.query(
      "INSERT INTO users (username) VALUES ($1) RETURNING id, username",
      [username]
    );
    const newUser = res.rows[0];

    await client.query(
      "INSERT INTO balances (user_id, amount) VALUES ($1, $2)",
      [newUser.id, 0]
    );

    await client.query("COMMIT");
    return newUser;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
