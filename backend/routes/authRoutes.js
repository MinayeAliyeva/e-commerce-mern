const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "⚠️ Bu email artıq istifadə olunub" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res
      .status(201)
      .json({ message: "İstifadəçi uğurla qeydiyyatdan keçdi" });
  } catch (err) {
    res.status(500).json({ message: "Server xətası" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "⚠️ Email və ya şifrə yanlışdır" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "⚠️ Email və ya şifrə yanlışdır" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, message: "✅ Giriş uğurlu oldu" });
  } catch (err) {
    res.status(500).json({ message: "❌ Server xətası" });
  }
});

router.get("/user",authMiddleware, async (req, res) => {
  try {
    console.log("İstifadəçi ID-si:", req.user);
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "❌ Server xətası" });
  }
});

module.exports = router;
