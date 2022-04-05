const config = require('dotenv');
const express = require("express");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3010;
require("./db/connection");

//middlewares
app.use(express.json())
app.use(cors());

app.get("/", (req, res) => {
    res.send("hy there!!")
});

app.listen(port, () => {
    console.log("connected port", port);
});
