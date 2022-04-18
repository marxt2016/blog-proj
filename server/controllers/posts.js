import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.json(postMessages);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);

    res.json(post);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({ ...post, author: req.userId, createdAt: new Date().toISOString() });
  try {
    await newPost.save();
    res.json(newPost);
  } catch (error) {
    res.status(409).json({ error: error });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) res.status(404).send("ID not found");
  const newPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
  res.json(newPost);
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: " Not Authorized" });

  if (!mongoose.Types.ObjectId.isValid(id)) res.status(404).send("ID not found");
  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((like) => like !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) res.status(404).send("ID not found");
  await PostMessage.findByIdAndRemove(_id);
  res.json({ message: "Deleted post" });
};
