const express = require("express");
const app = express();
const port = process.env.PORT || 3010;
require("./db/connection");

app.get("/", (req, res) => {
    res.send("hy there!!")
});

app.listen(port, () => {
    console.log("connected port", port);
});
