import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const getUserByToken = async (token) => {
  if (!token) {
    return res.status(401).json({ error: "Acesso negado" });
  }
  const decoded = jwt.verify(token, process.env.SECRET);
  const userId = decoded.id;
  const user = await User.findOne({ _id: userId });
  return user;
};
