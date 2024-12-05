const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Admin login
// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     try {
//       const user = await User.findOne({ email });
  
//       if (!user || user.role !== "admin") {
//         return res.status(403).json({ message: "Access denied." });
//       }
  
//       const isMatch = await bcrypt.compare(password, user.password);
  
//       if (!isMatch) {
//         return res.status(401).json({ message: "Invalid credentials." });
//       }
  
//       const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
//         expiresIn: "1d",
//       });
  
//       res.status(200).json({ token });
//     } catch (err) {
//       res.status(500).json({ error: "Login failed." });
//     }
//   });
  
//   get all user
router.get("/users", async (req, res) => {
    const { page = 1, limit = 10, search = "", sort = "firstName", order = "asc" } = req.query;
  
    try {
      const query = search
        ? {
            $or: [
              { firstName: new RegExp(search, "i") },
              { lastName: new RegExp(search, "i") },
              { email: new RegExp(search, "i") },
            ],
          }
        : {};
  
      const users = await User.find(query)
        .sort({ [sort]: order === "asc" ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));
  
      const totalUsers = await User.countDocuments(query);
  
      res.status(200).json({ users, totalUsers });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch users." });
    }
});
  
router.patch("/users/:id/toggle-block", async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      user.blocked = !user.blocked;
      await user.save();
  
      res.status(200).json({ message: `User ${user.blocked ? "blocked" : "unblocked"} successfully.` });
    } catch (err) {
      res.status(500).json({ error: "Failed to update user status." });
    }
  });
  
  router.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findByIdAndDelete(id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      res.status(200).json({ message: "User deleted successfully." });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete user." });
    }
  });
  
  module.exports = router;