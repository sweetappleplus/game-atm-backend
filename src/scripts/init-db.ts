import { pool } from "../db";
import fs from "fs";
import path from "path";

(async () => {
  const sql = fs
    .readFileSync(path.join(__dirname, "../../sql/schema.sql"))
    .toString();
  try {
    await pool.query(sql);
    console.log("✅ Database initialized");
  } catch (err) {
    console.error("❌ Error initializing DB:", err);
  } finally {
    await pool.end();
  }
})();
