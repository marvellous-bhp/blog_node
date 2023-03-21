const mongoose = require('mongoose');
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  username: { type: String, required: false },
  email: { type: String, required: false },
  password: { type: String, required: true },
  status: Joi.string().valid(
    "staff",
    "admin",
    {
      _mongoose: { default: "staff" },
    }
  ),

  
});

const User = mongoose.model('User', userSchema);

module.exports = User;

