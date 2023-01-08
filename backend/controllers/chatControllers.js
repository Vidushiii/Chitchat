const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModels");
const User = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "firstName, lastName,pic, email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      res.status(200).send(FullChat);
    } catch (error) {
      console.log(error);
      res.status(400);
      throw new Error(error);
    }
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "firstName, lastName,pic, email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error(error);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please fill all feilds!" });
  }
  const users = JSON.parse(req.body.users);
  if (users.length < 2) {
    return res.status(400).send({
      message: "More than two users are required to form a group chat.",
    });
  }
  // req.user gives us current user
  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updateChat = await Chat.findByIdAndUpdate(
    chatId,
    {chatName},   
    {new: true}
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updateChat) {
    res.status(404);
    throw new error("Chat not found");
  } else {
    res.json(updateChat);
  }
});

const addToGroup = asyncHandler(async(req,res) => {
    const {chatId, userId} = req.body;

    const added = await Chat.findByIdAndUpdate(
        chatId,{
            $push: { users: userId }
        },
        {new: true}
    ).populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new error("Not added");
  } else {
    res.json(added);
  }
})

const removeFromGroup = asyncHandler(async(req,res) => {
    const {chatId, userId} = req.body;

    const removed = await Chat.findByIdAndUpdate(
        chatId,{
            $pull: { users: userId }
        },
        {new: true}
    ).populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    console.log("not removed");
    throw new error("Not removed");
  } else {
    console.log("removed");
    res.json(removed);
  }
})


module.exports = { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup };
