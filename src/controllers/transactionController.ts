import { NextFunction, Request, Response } from "express";
import {
  depositMoneyService,
  getTransactionHistoryService,
  transferMoneyService,
  withdrawMoneyService,
} from "../services/transactionService";
export const depositController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, amount } = req.body;
    const newBalance = await depositMoneyService(userId, amount);
    res.json({
      message: "Deposit successful",
      balance: newBalance,
    });
  } catch (error) {
    next(error);
  }
};

export const withdrawController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, amount } = req.body;
    const newBalance = await withdrawMoneyService(userId, amount);
    res.json({
      message: "Withdrawal successful",
      balance: newBalance,
    });
  } catch (error) {
    next(error);
  }
};

export const transferController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fromUserId, toUserId, amount } = req.body;
    const { fromUserBalance, toUserBalance } = await transferMoneyService(
      fromUserId,
      toUserId,
      amount
    );
    res.json({
      message: "Transfer successful",
      fromUserBalance,
      toUserBalance,
    });
  } catch (error) {
    next(error);
  }
};

export const transactionHistoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.userId);
    const transactions = await getTransactionHistoryService(userId);
    res.json({ transactions });
  } catch (error) {
    next(error);
  }
};
