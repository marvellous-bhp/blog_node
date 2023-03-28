const mongoose = require('mongoose');
const Joi = require("joi");


const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  User: Joi.string().meta({
    _mongoose: { type: "ObjectId", ref: "User" },
  }),
  article: Joi.string().meta({
    _mongoose: { type: "ObjectId", ref: "Arrticle" },
  }),
  like_list: Joi.array().meta({
    _mongoose: { type: "[ObjectId]", ref: "User", default: [] },
  }),
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
