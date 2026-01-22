const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Schema/User");

const router = express.Router();


router.post("/signup", async (req, res, next) => {
  try {
    const { phoneNumber, password, confirmPassword } = req.body;
    console.log(req.body);

    if (!phoneNumber || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields required" });
    }
    console.log("here");

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
console.log("here2");
    const existingUser = await User.findOne({ phoneNumber });
    console.log("here3");
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    console.log("here4");

    const user = new User({ phoneNumber, password });
    console.log("here5");
    await user.save();
console.log("here6");
    res.status(201).json({
      message: "Signup successful",
    
    });
    console.log("here7");

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        phoneNumber: user.phoneNumber,
        rank: user.rank,
        totalPoints: user.totalPoints
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
