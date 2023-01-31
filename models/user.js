import mongoose from "mongoose";
let Schema = mongoose.Schema;
let UserSchema = new Schema({
  email: String,
  password: String
});
module.exports = mongoose.model("user", UserSchema);
