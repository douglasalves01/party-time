import bcrypt from "bcrypt";
import { User } from "../models/User.js";

export class UserController {
  static async getUser(req, res) {
    const id = req.params.id;

    //verify user
    try {
      const user = await User.findOne({ _id: id }, { password: 0 });
      res.json({ error: null, user });
    } catch (error) {
      return res.status(400).json({ error: "O usuário nã existe" });
    }
  }
}
