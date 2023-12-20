import jwt from "jsonwebtoken";

export const checkToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ error: "Acesso negado!" });
  }
  try {
    const verified = jwt.verify(token, process.env.SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Token inválido" });
  }
};
