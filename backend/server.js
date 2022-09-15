const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./Data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // to accept json data

const port = process.env.PORT || 5000;

// for get request

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use("/api/user", userRoutes);

app.listen(port, console.log(`Port${port}`));
