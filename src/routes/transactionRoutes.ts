import express from "express";
import {
  depositController,
  transactionHistoryController,
  transferController,
  withdrawController,
} from "../controllers/transactionController";

const router = express.Router();

router.post("/deposit", depositController);
router.post("/withdraw", withdrawController);
router.post("/transfer", transferController);
router.get("/history/:userId", transactionHistoryController);

export default router;
