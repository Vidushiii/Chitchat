const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    name: { type: String, requied: true },
    email: { type: String, requied: true },
    password: { type: String, requied: true },
    pic: {
      type: String,
      requied: true,
      default: "https://static.thenounproject.com/png/363640-200.png",
    },
  },
  {
    timeStamps: true,
  }
);

const User = mongoose.model("User", userModel);

module.exports = User;
