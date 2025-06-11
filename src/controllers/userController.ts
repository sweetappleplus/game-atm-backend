import { Request, Response } from "express";
import { createUserService } from "../services/userService";
import { validateUsername } from "../utils/validation";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    validateUsername(username);
    const newUser = await createUserService(username);
    res.status(201).json({
      message: "User created successfully",
      userId: newUser.id,
      username: newUser.username,
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
