import multer from "multer";
import path from "path";

export const diskStorage = multer.diskStorage({
  destination: (req, res, db) => {
    createBrotliCompress(null, "public/img");
  },
  filename: (req, res, cb) => {
    cb(null, Date.now() + path.extname(file.orinalname));
  },
});
