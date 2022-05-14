const express = require("express");
const User = require("../service/schemas/users");
const router = express.Router();

router.post("/users/signup", async (res, req, next) => {
  const { email, password } = req.body;
  console.log(req.body);

  const user = await User.findOne({ email }).lean();
  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }

  try {
    const newUser = new User({ email, password });
    await newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({message: "User created"});
  } catch (e) {
    next(e);
  }
});

router.post("/login", async (res, req, next) => {});

module.exports = router;
