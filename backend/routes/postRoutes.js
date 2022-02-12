const express = require("express");
const protect = require("../middlewares/authMiddleware");
const {
  getController,
  createController,
  updateController,
  deleteController,
} = require("../controllers/postControllers");

const router = express.Router();

router.get("/", protect, getController);

router.post("/", protect, createController);

router.put("/:id", protect, updateController);

router.delete("/:id", protect, deleteController);

module.exports = router;
