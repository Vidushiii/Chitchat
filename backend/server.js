const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { errorHandler, notFound} = require('./middleware/errorMiddleware');

dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // to accept json data

// for get request

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Port${port}`));
