import multer from "multer";
import shortid from "shortid";
import Image1 from "../models/Image.js";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.resolve(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${shortid.generate()}-${file.originalname}`);
  },
});

export const upload = multer({ storage: storage });

export const uploadImage = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).send("No file uploaded");

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    file.filename
  }`;
  const image = new Image1({ url: imageUrl, shortId: shortid.generate() });

  try {
    await image.save();
    res.json({
      url: `https://tt-img-kiet.onrender.com/api/images/${image.shortId}`,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getImage = async (req, res) => {
  try {
    const image = await Image1.findOne({ shortId: req.params.shortId });
    if (!image) return res.status(404).send("Image not found");
    res.redirect(image.url);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
