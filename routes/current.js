const { Router } = require("express");
const User = require("../service/schemas/users");
const router = Router();

router.get("/current", (req, res) => {
  const { email } = req.user;
  res.json({ message: `You are authorized: ${email}` });
});

router.get("/users/logout", (req, res) => {
  const user = User.findById({ _id: req.user });
  if (!user) {
    res.status(401).json({ message: "Not authorized" });
  } else {
    res.status(200).json("Logged out");
  }
});


module.exports = router;
