import express from "express";
import {
  depositController,
  transactionHistoryController,
  transferController,
  withdrawController,
} from "../controllers/transactionController";
import { validateRequest } from "../middlewares/validationMiddleware";

const router = express.Router();

router.post("/deposit", validateRequest("deposit"), depositController);
router.post("/withdraw", validateRequest("withdraw"), withdrawController);
router.post("/transfer", validateRequest("transfer"), transferController);
router.get(
  "/history/:userId",
  validateRequest("transactionHistory"),
  transactionHistoryController
);

export default router;
