const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
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
const { capturePayment, verifyPayment } = require("../controllers/payment");

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post(
  "/login",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password cannot be empty").exists(),
  ],
  login
);

// Route for user signup
router.post(
  "/signup",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password cannot be too short").isLength({ min: 6 }),
  ],
  signup
);

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp);

// Route for Changing the password
router.post(
  "/changepassword",
  [body("newPassword", "Password cannot be too short").isLength({ min: 6 })],
  auth,
  changepassword
);

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

// Route for resetting user's password after verification
router.post(
  "/reset-password",
  [body("password", "Password cannot be too short").isLength({ min: 6 })],
  resetPassword
);

// Route for registering a meal
router.post("/registerMeal", auth, registerMeal);

router.post("/capturePayment", auth, capturePayment);
router.post("/verifyPayment", auth, verifyPayment);

// Export the router for use in the main application
module.exports = router;
