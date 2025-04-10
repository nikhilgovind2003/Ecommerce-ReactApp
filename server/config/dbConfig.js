// dbConfig.js
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/test")
    .then(() => console.log("MongoDB Connected... "))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
