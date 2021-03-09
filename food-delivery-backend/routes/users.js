const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Load User model
const { User } = require("../models");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  User.findOne({ where: { userName: req.body.userName }}).then((user) => {
    if (user) {
      return res.status(400).json({ userName: "userName already exists" });
    } else {
      User.create({
        userName: req.body.userName,
        password: req.body.password,
      }).then((user) => res.json(user))
        .catch((err) => console.log(err));
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const userName = req.body.userName;
  const password = req.body.password;
  // Find user by email
  User.findOne({ where: { userName: userName }}).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "userName not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      let result = password == user.password;
      if (result) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };
        console.log("Match")
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
