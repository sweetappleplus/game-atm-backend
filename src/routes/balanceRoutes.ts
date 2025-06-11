import express from "express";
import { getBalanceController } from "../controllers/balanceController";

const router = express.Router();

router.get("/:userId", getBalanceController);

export default router;
