import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export class AuthController {
  static async createUser(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    //check for required field
    if (
      name == null ||
      email == null ||
      password == null ||
      confirmPassword == null
    ) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }
    //check if passwords match
    if (password != confirmPassword) {
      return res.status(400).json({ error: "As senhas não conferem" });
    }

    //check if user exists
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      return res.status(400).json({ error: "email informado já em uso" });
    }

    //create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new User({
      name: name,
      email: email,
      password: passwordHash,
    });
    try {
      const newUser = await user.save();
      //create token
      const token = jwt.sign(
        {
          name: newUser.name,
          id: newUser._id,
        },
        process.env.SECRET
      );
      //return token
      res.json({
        error: null,
        msg: "Você realizou o cadastro com sucesso",
        token: token,
        userId: newUser._id,
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
  static async login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    //check if user exists
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ error: "Email não cadastrado" });
    }
    //check password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ error: "Senha inválida" });
    }

    const token = jwt.sign(
      {
        name: user.name,
        id: user._id,
      },
      process.env.SECRET
    );
    res.json({
      error: null,
      msg: "Você está autenticado",
      token: token,
      userId: user._id,
    });
  }
}
