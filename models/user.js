const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  username: { type: String, required: false },
  email: { type: String, required: true },
  phone: { type: Number  , required: false },
  password: { type: String, required: true },
  avatar: {
    data: Buffer,
    contentType: String,
},
  // avatar_path: { type: String, required: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

