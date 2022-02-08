const asyncHandler = require("express-handler");

//GET Handler
const getController = (req, res) => {
  res.status(200).json({ results: [] });
};

//POST Handler
const createController = (req, res) => {
  if (!req.body.post) {
    res.status(400);
    throw new Error("Please enter post payload!");
  }

  res.status(200).json({ payload: req.body.post });
};

//PUT Handler
const updateController = (req, res) => {
  res.json({ message: `Update Routes id: ${req.params.id}` });
};

//DELETE Handler
const deleteController = (req, res) => {
  res.json({ message: `Delete Routes id: ${req.params.id}` });
};

module.exports = {
  getController,
  createController,
  updateController,
  deleteController,
};
