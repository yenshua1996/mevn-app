const express = require("express");
const router = express.Router();
const {
  getUser,
  loginUser,
  registerUser,
} = require("../controllers/userController");

router.get("/me", getUser);
router.post("/", registerUser);
router.post("/login", loginUser);

module.exports = router;
