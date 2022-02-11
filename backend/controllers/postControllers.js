const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel.js");

//GET Handler
//Access Public
const getController = asyncHandler(async (req, res) => {
  //Find all post
  const posts = await Post.find();

  //Response
  res.status(200).json(posts);
});

//POST Handler
//Access Private
const createController = asyncHandler(async (req, res) => {
  //Check post
  if (!req.body.post) {
    res.status(400);
    throw new Error("Please enter post payload!");
  }

  //Create post
  const post = await Post.create({
    post: req.body.post,
  });

  //Response
  res.status(200).json(post);
});

//PUT Handler
//Access Private
const updateController = asyncHandler(async (req, res) => {
  //Find post
  const post = await Post.findById(req.params.id);

  // Check post
  if (!post) {
    res.status(400);

    throw new Error("Post not found!");
  }

  //Update post
  const updatePost = await Post.findByIdAndUpdate(
    req.params.id,
    { post: req.body.post },
    {
      new: true,
    }
  );

  //Response
  res.status(200).json(updatePost);
});

//DELETE Handler
//Access Private
const deleteController = asyncHandler(async (req, res) => {
  //Find post
  const post = await Post.findById(req.params.id);

  //Check post
  if (!post) {
    res.status(400);
    throw new Error("Goal not found!");
  }

  //Remove post
  await post.remove();

  //Response
  res.json({ id: req.params.id });
});

//Exports
module.exports = {
  getController,
  createController,
  updateController,
  deleteController,
};
