import express from "express";
import { getBalanceController } from "../controllers/balanceController";
import { validateRequest } from "../middlewares/validationMiddleware";

const router = express.Router();

router.get("/:userId", validateRequest("getBalance"), getBalanceController);

export default router;
