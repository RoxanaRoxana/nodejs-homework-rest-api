const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const user = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
  },
});

user.methods.setPassword = async function (password) {
    this.password = await bcrypt.hash(password, bcrypt.genSaltSync(10))
}

user.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};


const User = mongoose.model("user", user);

module.exports = User;