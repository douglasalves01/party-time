import express from "express";
import { AuthController } from "../controllers/AuthController.js";

export const authRouter = express.Router();

authRouter.post("/register", AuthController.createUser);
