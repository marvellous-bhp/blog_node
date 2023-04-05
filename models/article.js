const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const Joi = require("joi");
const dompurify = createDomPurify(new JSDOM().window)

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  detail:{
    type: String
  },
  markdown: {
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
  slug: {
    type: String,
    required: true,
    unique: true
  },
  sanitizedHtml: {
    type: String,
    required: true
  },
  User: Joi.string().meta({
    _mongoose: { type: "ObjectId", ref: "User" },
  }),
  status: {
    type: String,
    enum: ['public', 'private'],
  },
  like_list: Joi.array().meta({
    _mongoose: { type: "[ObjectId]", ref: "User"},
  }),
  like_count: {
    type: Number,
    required: false
  },
  comment_list: Joi.array().meta({
    _mongoose: { type: "[ObjectId]", ref: "Comment"},
  }),
})

articleSchema.pre('validate', function(next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }

  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
  }

  next()
})

module.exports = mongoose.model('Article', articleSchema)