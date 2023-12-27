import { Party } from "../models/party.js";
import { User } from "../models/User.js";
import { getUserByToken } from "../helpers/getUserByToken.js";

export class PartyController {
  static async newParty(req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const partyDate = req.body.party_date;

    let files = [];

    if (req.files) {
    }
    if (req.files) {
      files = req.files.photos;
    }

    //validation
    if (title == "null" || description == "null" || partyDate == "null") {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    //verify user
    const token = req.header("auth-token");
    const userByToken = await getUserByToken(token);
    const userId = userByToken._id.toString();
    try {
      const user = await User.findOne({ _id: userId });
      let photos = [];
      if (files && files.length > 0) {
        files.forEach((photo, i) => {
          photos[i] = photo.path;
        });
      }
      const party = new Party({
        title: title,
        description: description,
        partyDate: partyDate,
        photos: photos,
        privacy: req.body.privacy,
        userId: user._id,
      });
      try {
        const newParty = await party.save();
        res.json({
          error: null,
          msg: "Evento criado com sucesso!",
          data: newParty,
        });
      } catch (error) {
        return res.status(400).json({ error });
      }
    } catch (error) {
      return res.status(400).json({ error: "Acesso negado" });
    }
  }
  static async allParty(req, res) {
    try {
      const parties = await Party.find({ privacy: false }).sort([["._id", -1]]);
      res.json({ error: null, parties: parties });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
  static async userParties(req, res) {
    try {
      const token = req.header("auth-token");
      const user = await getUserByToken(token);
      const userId = user._id.toString();
      const parties = await Party.find({ userId: userId });
      res.json({ error: null, parties: parties });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
  static async partyUser(req, res) {
    try {
      const token = req.header("auth-header");
      const user = await getUserByToken(token);
      const userId = user._id.toString();
      const partyId = req.partyDate.id;

      const party = await Party.findOne({ _id: partyId, userId: userId });
      res.json({ error: null, party: party });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}
