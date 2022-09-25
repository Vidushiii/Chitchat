const express = require("express");
const { registerUser, authUser, allUsers } = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

// Instance on router
const router = express.Router();

// to chain multiple request
router.route("/").post(registerUser).get(protect, allUsers); // Signup then get all users
// // other way
router.post("/login", authUser); // Login

module.exports = router;
