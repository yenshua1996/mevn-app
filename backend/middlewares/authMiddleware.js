const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  //Token variable
  let token;

  //Check headers authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Extract token
      token = req.headers.authorization.split(" ")[1];

      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Find user using decoded token
      req.user = await User.findById(decoded.id).select("-password");

      //Move to next handler
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not authorized!");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, Token is missing");
  }
});

module.exports = protect;
