const express = require("express");
const User = require("../service/schemas/users");
const router = express.Router();
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");




router.post("/users/signup", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).lean();
  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }

  try {
    const avatarURL = gravatar.url(email);
    const newUser = new User({ email, password, avatarURL });
    await newUser.setPassword(password);
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created", user: email, id: user._id});
  } catch (e) {
    next(e);
  }
});

router.post("/users/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isPasswordCorrect = await user.validatePassword(password);
  if (!user || !isPasswordCorrect) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }
  const payload = {
    id: user._id,
    email: user.email
  };

//const secret = "secret word"

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "12h" });
  res.json({token})
});




module.exports = router;
