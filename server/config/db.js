const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// const MONGO_URI = process.env.MONGO_URI || "";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected...");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = connectDB;
