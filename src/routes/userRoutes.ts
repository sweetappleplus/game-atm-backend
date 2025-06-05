import express from "express";
import {
  createUser,
  deposit,
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

export default router;
