const { Router } = require("express");
const User = require("../service/schemas/users");
const router = Router();

router.get("/users/verify/:verificationToken", (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne(verificationToken);
    if (!user) {
        res.status(404).json("User not found")
    } else {
        user.verificationToken = null;
        user.verify = true;
        res.status(200).json('Verification successful')
    }
});

router.post("/users/verify", (req, res) => {
    const { email } = req.body;
    
     try {
    const user = await User.findOne({ email }).lean();
    if (!user) {
      res.status(404).json({
        message: `User not found`,
      });
    } else if (!user.verify) {
      sendMail(email, user.verificationToken);
      res.status(200).json({
        message: "Verification email sent",
      });
    } else {
      res.status(400).json({
        message: "Verification has already been passed",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
})