import { NextFunction, Request, Response } from "express";
import { getBalanceService } from "../services/balanceService";

export const getBalanceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.userId);
    const balance = await getBalanceService(userId);
    res.json({ userId, balance });
  } catch (error) {
    next(error);
  }
};
