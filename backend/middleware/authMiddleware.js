const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async(req,res,next) => {
    let token;

    if( req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded= jwt.verify(token, "addJWTSecrethere");

            req.user= await User.findById(decoded.id).select("-password");
            next();
        } catch (error){
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
});

module.exports = { protect };