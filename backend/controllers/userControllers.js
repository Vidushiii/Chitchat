const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, pic } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error("Please fill all details");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User with this email address already exists!");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user!");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists && (await userExists.matchPassword(password))) {
    res.json({
      _id: userExists._id,
      firstName: userExists.firstName,
      lastName: userExists.lastName,
      email: userExists.email,
      pic: userExists.pic,
      token: generateToken(userExists._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// /api/user?search=value
const allUsers = asyncHandler(async(req,res) =>{
  const keyword = req.query.search ? {
    $or: [
      {firstName : { $regex: req.query.search, $options: "i"}},
    {email : { $regex: req.query.search, $options: "i"}}
  ]
  }: {};

  const users = await User.find(keyword).find({_id :{ $ne: req.user._id}});
  res.send(users);
})

module.exports = { registerUser, authUser, allUsers };
