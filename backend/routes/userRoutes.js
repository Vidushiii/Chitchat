const express = require("express");
const { registerUser, authUser } = require("../controllers/userControllers");

// Instance on router
const router = express.Router();

// to chain multiple request
router.route("/").post(registerUser);
// // other way
router.post("/login", authUser);

module.exports = router;
