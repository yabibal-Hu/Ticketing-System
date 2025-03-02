// import { Request, Response } from "express";
// import User from "../models/User";
// import { AuthRequest } from "../middleware/authMiddleware";

const User = require("../models/User");
// 📌 Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select(
      "-password"
    );
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: `Server error ${error}` });
  }
};

// 📌 Update Online Status
const updateOnlineStatus = async (req, res) => {
  try {
    const { isOnline } = req.body;
    await User.findByIdAndUpdate(req.user._id, { isOnline });
    res.json({ message: "Status updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//get getUserById
const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUsers, updateOnlineStatus, getUserById };