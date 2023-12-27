import express from "express";
import { PartyController } from "../controllers/PartyController.js";
import { checkToken } from "../helpers/checkToken.js";
import { diskStorage } from "../helpers/fileStorage.js";
import multer from "multer";
export const partyRouter = express.Router();

const upload = multer({ Storage: diskStorage });
//define file storage
partyRouter.get(
  "/",
  checkToken,
  upload.fields([{ name: "photos" }]),
  PartyController.newParty
);
partyRouter.get("/all", PartyController.allParty);
partyRouter.get("/userparties", checkToken, PartyController.userParties);
