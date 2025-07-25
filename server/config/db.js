const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected Successfully");
  } catch (error) {
    console.error("Error connectiong Databse", error);
    // process.exit(1);
  }
};

module.exports = connectDB;
