import { NextFunction, Request, Response } from "express";
import { createUserService } from "../services/userService";

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.body;
    const newUser = await createUserService(username);
    res.status(201).json({
      message: "User created successfully",
      userId: newUser.id,
      username: newUser.username,
    });
  } catch (error) {
    next(error);
  }
};
