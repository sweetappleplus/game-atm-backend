import express from "express";
import {
  createUser,
  deposit,
  getHistory,
  getUserBalance,
  transfer,
  withdraw,
} from "../controllers/userController";

const router = express.Router();

router.post("/", createUser);
router.get("/:id/balance", getUserBalance);
router.post("/:id/deposit", deposit);
router.post("/:id/withdraw", withdraw);
router.post("/:id/transfer", transfer);
router.get("/:id/history", getHistory);

export default router;
