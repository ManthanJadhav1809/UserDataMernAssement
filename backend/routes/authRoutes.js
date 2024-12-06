const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello from auth route!');
});

// Register
router.post("/register", async (req, res) => {
  const { firstName,lastName, email, password } = req.body;
  try {
    const user = new User({ firstName,lastName, email, password });
    user.otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otpExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes from now
    await user.save();
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token});
  
    await sendEmail(email, "Verify OTP", `Your OTP is ${user.otp}`);
    res.status(201).json({ message: "User registered. Verify OTP sent." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  if (!user.otp || user.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP." });
  }

  if (Date.now() > user.otpExpiresAt) {
    return res.status(400).json({ message: "OTP has expired." });
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpiresAt = null;
  await user.save();

  res.json({ message: "Email verified successfully." });
});

// Resend
router.post("/resend-otp", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  user.otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otpExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save();

  await sendEmail(email, "Resend OTP", `Your new OTP is ${user.otp}`);
  res.json({ message: "New OTP sent to your email." });
});


// Login
router.post("/login", async (req, res) => {
  const { email, password, otp } = req.body;
  const user = await User.findOne({ email });
  
  
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

   // Check if the user is blocked
   if (user.blocked) {
    return res.status(403).json({ message: "Your account is blocked. Please contact support." });
  }

  if (!user.isVerified) {
    if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP." });
    user.isVerified = true;
    user.otp = null;
    await user.save();
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token});
  // res.json({ message:"login done sucessfully"});
});

// Forget Password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found." });
  const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = resetToken;
  await user.save();
  await sendEmail(email, "Reset Password OTP", `Your OTP is ${resetToken}`);
  res.json({ message: "Password reset OTP sent to your email." });
});

// Change Password
router.put("/change-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.otp !== otp) return res.status(400).json({ message: "Invalid OTP." });
  user.password = newPassword;
  user.otp = null;
  await user.save();
  res.json({ message: "Password updated successfully." });
});

module.exports = router;
