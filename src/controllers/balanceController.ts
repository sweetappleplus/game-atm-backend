import { Request, Response } from "express";
import { getBalanceService } from "../services/balanceService";

export const getBalanceController = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  try {
    const balance = await getBalanceService(userId);
    res.json({ userId, balance });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
