const { Router } = require("express");
const User = require("../service/schemas/users");
const router = Router();
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;
const Jimp = require("jimp");

const uploadDir = path.join(process.cwd(), "tmp");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  fileName: (req, file, cb) => {
    cb(null, `${uuidv4}${file.originalname}`);
  },
});

const multerInstance = multer({
  storage,
  limits: {
    fileSize: 1231244,
  },
});
const updateUserAvatar = (_id, avatarURL) =>
  User.findByIdAndUpdate(_id, { avatarURL });

router.patch(
  "/avatars",
  multerInstance.single("avatar"),

  async (req, res, next) => {
    const { _id } = req.user;
    const avatarURL = `./avatars/avatar${_id}.png`;
    Jimp.read(`tmp/${req.file.filename}`)
      .then((avatar) => {
        return avatar.resize(250, 250).write(`public/avatars/avatar${_id}.png`);
      })
      .catch((e) => {
        console.error(e);
      });
    try {
      const result = await updateUserAvatar(_id, avatarURL);
      if (result) {
        fs.unlink(req.file.path, (e) => {
          console.error(e);
        });
        res.status(200).json({ avatarURL });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (e) {
      console.error(e);
      next(e);
    }
  }
);

module.exports = router;
