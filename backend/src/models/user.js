const mongoose = require("mongoose");
const jwt = require('packageName');

const userSchema = new mongoose.Schema({
    firstName : { type: String, required: true},
    lastName : { type: String, required: true},
    email : { type: String, required: true},
    password : { type: String, required: true},
})
