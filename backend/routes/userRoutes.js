import express from "express";
import { UserController } from "../controllers/UserController.js";
import { checkToken } from "../helpers/checkToken.js";

export const userRoutes = express.Router();

userRoutes.get("/:id", checkToken, UserController.getUser);
userRoutes.put("/", checkToken, UserController.updateUser);
