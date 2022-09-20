const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userModel = mongoose.Schema(
  {
    firstName: { type: String, requied: true },
    lastName: { type: String, requied: true },
    email: { type: String, requied: true, unique: true },
    password: { type: String, requied: true },
    pic: {
      type: String,
      default: "https://static.thenounproject.com/png/363640-200.png",
    },
  },
  {
    timeStamps: true,
  }
);

userModel.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userModel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userModel);

module.exports = User;
