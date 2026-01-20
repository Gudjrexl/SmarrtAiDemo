const express = require("express");
const User = require("../Schema/User");

const router = express.Router();

// ✅ GET USER PROFILE (NO PASSWORD)
router.get("/profile/:phoneNumber", async (req, res) => {
  try {
    const { phoneNumber } = req.params;

    const user = await User
      .findOne({ phoneNumber })
      .select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.patch("/update", async (req, res) => {
  try {
    const { phoneNumber, ...updates } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: "phoneNumber is required" });
    }

    

    const user = await User.findOneAndUpdate(
      { phoneNumber },
      { $set: updates },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User details updated successfully",
      user
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
