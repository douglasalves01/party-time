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
  }
}
