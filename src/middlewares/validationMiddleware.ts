import { Request, Response, NextFunction } from "express";
import {
  validateAmount,
  validateUserId,
  validateUsername,
} from "../utils/validation";

export const validateRequest = (type: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (type === "createUser") {
        const { username } = req.body;
        validateUsername(username);
      }
      if (type === "getBalance" || type === "transactionHistory") {
        const userId = parseInt(req.params.userId);
        validateUserId(userId);
      }
      if (type === "deposit" || type === "withdraw") {
        const { amount, userId } = req.body;
        validateAmount(amount);
        validateUserId(userId, "User ID");
      }
      if (type === "transfer") {
        const { fromUserId, toUserId, amount } = req.body;
        validateUserId(fromUserId, "From User ID");
        validateUserId(toUserId, "To User ID");
        validateAmount(amount);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
