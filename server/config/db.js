//const dotenv = require("dotenv");
//const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri = process.env.ATLAS_URL;
// const client = new MongoClient(uri, {
//   // useNewUrlParser: true,
//   // useUnifiedTopology: true,
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
// export async function connectToDatabase() {
//   try {

//     await client.connect();
//     await client.db("admin").command({ ping: 1 });
//     console.log("Connected successfully to server");
//     // return client.db("phonebook");
//   } catch (err) {
//     console.error(err);
//   }
// }

// import mongoose from "mongoose";
// import dotenv from "dotenv";

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
