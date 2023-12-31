import express from "express";
import { PartyController } from "../controllers/PartyController.js";
import { checkToken } from "../helpers/checkToken.js";
import { diskStorage } from "../helpers/fileStorage.js";
import multer from "multer";
export const partyRouter = express.Router();

const upload = multer({ Storage: diskStorage });
//define file storage
partyRouter.post(
  "/",
  checkToken,
  upload.fields([{ name: "photos" }]),
  PartyController.newParty
);
partyRouter.get("/all", PartyController.allParty);
partyRouter.get("/userparties", checkToken, PartyController.userParties);
partyRouter.get("/userparty/:id", checkToken, PartyController.partyUser);
partyRouter.get("/:id", PartyController.getPartyAll);
partyRouter.delete("/", checkToken, PartyController.deleteParty);
partyRouter.put(
  "/",
  checkToken,
  upload.fields([{ name: "photos" }]),
  PartyController.updateParty
);
