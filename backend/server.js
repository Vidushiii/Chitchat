const express = require('express');
const dotenv = require('dotenv');
const {chats} = require("./Data/data");
const connectDB = require('./config/db');


dotenv.config();
connectDB();
const app = express();

const port = process.env.PORT || 5000;

// for get request

app.get('/',(req,res) => {res.send("Api is running")});

app.get('/chats', (req,res) => {
    res.send(chats);
})

// data for specific id

app.get('/chats/:id', (req,res) => {
    const singlechat = chats.find((c)=> c._id === req.params.id);
    res.send(singlechat);
});

app.listen(port,console.log(`jjjjjjjjj${port}`));