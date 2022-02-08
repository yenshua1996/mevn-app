const express = require("express");

const {
  getController,
  createController,
  updateController,
  deleteController,
} = require("../controllers/postControllers");

const router = express.Router();

router.get("/", getController);

router.post("/", createController);

router.put("/:id", updateController);

router.delete("/:id", deleteController);

module.exports = router;
