const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "20d" });
};

//Get User
const getUser = asyncHandler(async (req, res) => {
  const user = await User.find();
  res.json({ result: user });
});

//Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //Check input
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields!");
  }

  //Check if user exist
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exist");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  //Check user
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data!");
  }
});

//Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Check for user email
  const user = await User.findOne({ email });

  //Check password and user
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credintials");
  }
});

module.exports = {
  getUser,
  registerUser,
  loginUser,
};
