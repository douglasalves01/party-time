import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { getUserByToken } from "../helpers/getUserByToken.js";

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
  static async updateUser(req, res) {
    const token = req.header("auth-toekn");
    const user = await getUserByToken(user);

    const userReqId = req.body.id;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    const userId = user._id.toString();

    if (userId != userReqId) {
      res.status(401).json({ error: "Acesso negado" });
    }

    const updateData = {
      name: req.body.name,
      email: req.body.email,
    };

    if (password != confirmPassword) {
      res.status(401).json({ error: "As senhas n]ao conferem!" });
    } else if (password === confirmPassword && password != null) {
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);
    }

    updateData.password = passwordHash;
    try {
      const updateUser = await User.findOneAndUpdate(
        { _id: userId },
        { $set: updateData },
        { new: true }
      );
      res.json({
        error: null,
        msg: "Usuário atualizado com sucesso!",
        data: updateUser,
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}
