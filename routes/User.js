// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../uploads/avatars");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Get user profile
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update user profile
router.put("/profile", auth, async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { username, email },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: "Update failed" });
  }
});

// Upload avatar
router.post("/avatar", auth, upload.single("avatar"), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatarUrl: `/uploads/avatars/${req.file.filename}` },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: "Avatar upload failed" });
  }
});

module.exports = router;
