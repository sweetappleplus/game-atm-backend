import { Request, Response } from "express";
import {
  depositMoneyService,
  getTransactionHistoryService,
  transferMoneyService,
  withdrawMoneyService,
} from "../services/transactionService";
import { validateUserId, validateAmount } from "../utils/validation";
export const depositController = async (req: Request, res: Response) => {
  try {
    const { userId, amount } = req.body;
    validateUserId(userId);
    validateAmount(amount);
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
  try {
    const { userId, amount } = req.body;
    validateUserId(userId);
    validateAmount(amount);
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
  try {
    const { fromUserId, toUserId, amount } = req.body;
    validateUserId(fromUserId, "From_User_ID");
    validateUserId(toUserId, "To_User_ID");
    validateAmount(amount);
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
  try {
    const userId = parseInt(req.params.userId);
    validateUserId(userId);
    const transactions = await getTransactionHistoryService(userId);
    res.json({ transactions });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
