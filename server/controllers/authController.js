const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.warn(
    "⚠️ WARNING: JWT_SECRET is missing. Set it in your environment variables."
  );
}

// Token generation function


// 📌   Register User
const signup = async (req, res) => {
  try {
    const { username, password, role } = req.body;
   
    const user = new User({ username, password, role });
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }  
};

// 📌 Login User

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log("user", user);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ _id: user._id, role: user.role, username }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ 
      message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

module.exports = { signup, login };
