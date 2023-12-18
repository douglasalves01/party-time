import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
//routes

//middlewares

//config
const app = express();
app.use(express.json());
app.use(express.static("public"));
//atrelar rotas no express

app.get("/", (req, res) => {
  res.json({ message: "Rota teste" });
});

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});

//conexao mongoDb
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
