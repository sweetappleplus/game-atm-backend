import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../utils/ValidationError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  if (err instanceof ValidationError) {
    res.status(400).json({ message: err.message });
    return;
  }

  res.status(500).json({
    message: err.message || "Something went wrong! Please try again later.",
  });
};
