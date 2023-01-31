import mongoose from "mongoose";

let connectDB = () => {
  mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})};

module.exports = connectDB;

