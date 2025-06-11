import express from "express";
import { createUserController } from "../controllers/userController";
import { validateRequest } from "../middlewares/validationMiddleware";

const router = express.Router();

router.post("/", validateRequest("createUser"), createUserController);

export default router;
