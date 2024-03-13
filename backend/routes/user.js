const express = require("express");
const router = express.Router();

const {
  login,
  signup,
  sendotp,
  changepassword,
} = require("../controllers/Auth");

const {
  resetPassword,
  resetPasswordToken,
} = require("../controllers/resetPassword");

const { auth } = require("../middleware/auth");

const { registerMeal } = require("../controllers/registerMeal");

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/signup", signup);

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp);

// Route for Changing the password
router.post("/changepassword", auth, changepassword);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword);

// Route for registering a meal
router.post("/registerMeal", registerMeal);

// Export the router for use in the main application
module.exports = router;
