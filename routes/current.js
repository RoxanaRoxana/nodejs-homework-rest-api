const { Router } = require("express");

const router = Router();

router.get("/current", (req, res) => {
  const { email } = req.user;
  res.json({ message: `You are authorized: ${email}` });
});


module.exports = router;
