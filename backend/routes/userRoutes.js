const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello from user route!');
});

// Get Profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    console.log("Fetching profile for user:", req.user); // Debug log
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Profile
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { firstName, lastName, email },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user profile" });
  }
});

// Delete Profile
router.delete("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user profile" });
  }
});

module.exports = router;
