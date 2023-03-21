const mongoose = require('mongoose')
const { JSDOM } = require('jsdom')
const Joi = require("joi");

const workTimeSchema = new mongoose.Schema({
  timeStart: Joi.date().meta({
    _view: { type: "datetime" },
  }),
  timeEnd: Joi.date().meta({
    _view: { type: "datetime" },
  }),
  date: Joi.date().meta({
    _view: { type: "datetime" },
  }),
  User: Joi.string().meta({
    _mongoose: { type: "ObjectId", ref: "User" },
  }),
})



module.exports = mongoose.model('workTime', workTimeSchema)