const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin =  require("../models/Admin");
const OTP = require("../models/OTP");
require("dotenv").config();
const { body, validationResult } = require("express-validator");
const JWT_SECRET = "newanurag";

exports.createAdmin = async (req, res) => {
    //If errors , this will print the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Destructure fields from the request body
      const {
        messname,
        email,
        password,
        confirmPassword,
        otp,
      } = req.body;
      // Check if All Details are there or not
      if (
        !messname||
        !email ||
        !password ||
        !confirmPassword ||
        !otp
      ) {
        return res.status(403).send({
          success: false,
          message: "All Fields are required",
        });
      }
      // Check if password and confirm password match
      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message:
            "Password and Confirm Password do not match. Please try again.",
        });
      }
  
      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ messname });
      if (existingAdmin) {
        return res.status(400).json({
          success: false,
          message: "admin already exists. Please sign in to continue.",
        });
      }
  
      // Find the most recent OTP for the email
      const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
      console.log(response);
      if (response.length === 0) {
        // OTP not found for the email
        return res.status(400).json({
          success: false,
          message: "The OTP is not valid",
        });
      } else if (otp !== response[0].otp) {
        // Invalid OTP
        return res.status(400).json({
          success: false,
          message: "The OTP is not valid",
        });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const admin = await Admin.create({
        messname,
        email,
        password: hashedPassword,
      });
  
      const token = jwt.sign(
        { email: admin.email, id: admin._id },
        JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
  
      // Save token to admin document in database
      admin.password = undefined;
      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        admin,
        message: `Admin Login Success`,
      });
  
      return res.status(200).json({
        success: true,
        admin,
        message: "Admin registered successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "admin cannot be registered. Please try again.",
      });
    }
  };



  // Controller for Login
exports.loginAdmin = async (req, res) => {
    //If errors , this will print the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Get email and password from request body
      const {messname, password } = req.body;
  
      // Check if email or password is missing
      if (!messname || !password) {
        // Return 400 Bad Request status code with error message
        return res.status(400).json({
          success: false,
          message: `Please Fill up All the Required Fields`,
        });
      }
  
      // Find admin with provided email
      const admin = await Admin.findOne({ messname });
  
      // If admin not found with provided email
      if (!admin) {
        // Return 401 Unauthorized status code with error message
        return res.status(401).json({
          success: false,
          message: `Admin is not Registered with Us`,
        });
      }
  
      // Generate JWT token and Compare Password
      if (await bcrypt.compare(password, admin.password)) {
        const token = jwt.sign(
          { email: admin.email, id: admin._id },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        );
  
        // Save token to admin document in database
        admin.token = token;
        admin.password = undefined;
        // Set cookie for token and return success response
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        res.cookie("token", token, options).status(200).json({
          success: true,
          token,
          admin,
          message: `Admin Login Success`,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: `Password is incorrect`,
        });
      }
    } catch (error) {
      console.error(error);
      // Return 500 Internal Server Error status code with error message
      return res.status(500).json({
        success: false,
        message: `Login Failure Please Try Again`,
      });
    }
  };