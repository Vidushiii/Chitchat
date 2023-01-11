const { bool } = require("joi");
const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    chatName: { type: String, required: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timeStamps: true,
  }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;
