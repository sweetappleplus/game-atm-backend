import { Request, Response } from "express";
import { getBalanceService } from "../services/balanceService";
import { validateUserId } from "../utils/validation";

export const getBalanceController = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    validateUserId(userId);
    const balance = await getBalanceService(userId);
    res.json({ userId, balance });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
