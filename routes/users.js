const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// =====================
// REGISTER PAGE (GET)
// =====================
router.get("/register", (req, res) => {
  res.render("register");
});

// =====================
// REGISTER POST
// =====================
router.post("/register", async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Validate fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  // Check password match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (errors.length > 0) {
    return res.render("register", { errors, name, email, password, password2 });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      errors.push({ msg: "Email already registered" });
      return res.render("register", { errors, name, email, password, password2 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    req.flash("success_msg", "You are now registered! Please log in.");
    res.redirect("/users/login");
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Something went wrong");
    res.redirect("/users/register");
  }
});

// =====================
// LOGIN PAGE (GET)
// =====================
router.get("/login", (req, res) => {
  res.render("login");
});

// =====================
// LOGIN POST
// =====================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error_msg", "Invalid email or password");
      return res.redirect("/users/login");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash("error_msg", "Invalid email or password");
      return res.redirect("/users/login");
    }

    // Store user in session
    req.session.user = user;
    req.flash("success_msg", "Logged in successfully");
    res.redirect("/");
  } catch (err) {
    console.error(err);
    req.flash("error_msg", "Something went wrong");
    res.redirect("/users/login");
  }
});

// =====================
// LOGOUT
// =====================
router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) console.error(err);
    res.redirect("/users/login");
  });
});

module.exports = router;
