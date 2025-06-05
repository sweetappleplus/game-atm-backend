import { Request, Response } from "express";
import {
  createUserService,
  depositService,
  getHistoryService,
  getUserBalanceService,
  transferService,
  withdrawService,
} from "../services/userService";

export const createUser = async (req: Request, res: Response) => {
  const { username } = req.body;

  if (!username) {
    res.status(400).json({ message: "Username is required" });
    return;
  }

  try {
    const user = await createUserService(username);
    res.status(201).json(user);
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserBalance = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  if (!userId) {
    res.status(400).json({ message: "Invalid user ID" });
    return;
  }

  try {
    const balance = await getUserBalanceService(userId);
    res.json({ balance });
  } catch (error) {
    console.error("Balance error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deposit = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const { amount } = req.body;

  if (!userId || !amount || amount <= 0) {
    res.status(400).json({ message: "Invalid user ID or amount" });
    return;
  }

  try {
    const result = await depositService(userId, amount);
    res.status(201).json(result);
  } catch (error) {
    console.error("Deposit error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const withdraw = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const { amount } = req.body;

  if (!userId || !amount || amount <= 0) {
    res.status(400).json({ message: "Invalid user ID or amount" });
    return;
  }

  try {
    const balance = await getUserBalanceService(userId);
    if (amount > balance) {
      res.status(400).json({ message: "Insufficient funds" });
      return;
    }

    const result = await withdrawService(userId, amount);
    res.status(201).json(result);
  } catch (error) {
    console.error("Withdraw error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const transfer = async (req: Request, res: Response) => {
  const fromUserId = parseInt(req.params.id);
  const { toUserId, amount } = req.body;

  if (!fromUserId || !toUserId || !amount || amount <= 0) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }

  try {
    const balance = await getUserBalanceService(fromUserId);
    if (amount > balance) {
      res.status(400).json({ message: "Insufficient funds" });
      return;
    }

    const result = await transferService(fromUserId, toUserId, amount);
    res.status(201).json(result);
  } catch (error) {
    console.error("Transfer error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  if (!userId) {
    res.status(400).json({ message: "Invalid user ID" });
    return;
  }

  try {
    const history = await getHistoryService(userId);
    res.json(history);
  } catch (error) {
    console.error("History error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
