const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const { login } = require("../controllers/authController");
const { login } = require("../controllers/authController");
const authModel = require("../model/authController");
const {
  generateToken,
  comparePasswords,
  validateEmail,
} = require("../Utils/authUtils");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await authModel.login({ email });

    console.log(result);

    if (!result.length) {
      return res.status(401).send({
        success: false,
        message: "No user found with this email",
      });
    }

    const user = result[0];

    // Validate password
    const isMatch = await comparePasswords(
      password.toString(),
      user.password.toString()
    );

    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Incorrect password",
      });
    }

    // Generate token
    const token = generateToken(user);

    // Successful login response
    return res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user: user.role,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, phone_no, password, role, status } =
      req.body;

    // Validate inputs
    if (!first_name) {
      return res.status(400).send({
        success: false,
        message: "First Name is required",
      });
    }
    if (!last_name) {
      return res.status(400).send({
        success: false,
        message: "Last Name is required",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required",
      });
    }
    if (!phone_no) {
      return res.status(400).send({
        success: false,
        message: "Phone Number is required",
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "Password is required",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).send({
        success: false,
        message: "Invalid email format",
      });
    }

    // Check if the user already exists
    const existingUser = await authModel.checkUserExists(email);
    if (existingUser.length > 0) {
      return res.status(409).send({
        success: false,
        message: "Email is already registered",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Register the user
    const newUser = {
      first_name,
      last_name,
      email,
      phone_no,
      password: hashedPassword,
      role,
      status,
    };

    await authModel.register(newUser);

    return res.status(201).send({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
