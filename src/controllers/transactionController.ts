import { Request, Response } from "express";
import {
  depositMoneyService,
  getTransactionHistoryService,
  transferMoneyService,
  withdrawMoneyService,
} from "../services/transactionService";

export const depositController = async (req: Request, res: Response) => {
  const { userId, amount } = req.body;

  try {
    const newBalance = await depositMoneyService(userId, amount);
    res.json({
      message: "Deposit successful",
      balance: newBalance,
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const withdrawController = async (req: Request, res: Response) => {
  const { userId, amount } = req.body;

  try {
    const newBalance = await withdrawMoneyService(userId, amount);
    res.json({
      message: "Withdrawal successful",
      balance: newBalance,
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const transferController = async (req: Request, res: Response) => {
  const { fromUserId, toUserId, amount } = req.body;

  try {
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
    res.status(500).json({ message: (error as Error).message });
  }
};

export const transactionHistoryController = async (
  req: Request,
  res: Response
) => {
  const userId = parseInt(req.params.userId);

  try {
    const transactions = await getTransactionHistoryService(userId);
    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
