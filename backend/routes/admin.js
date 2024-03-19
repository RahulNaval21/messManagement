const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const {createAdmin, loginAdmin, changePasswordAdmin} = require("../controllers/AdminAuth");
// ***************************************************************************************************************
//                                                 Admin                                                         *
//****************************************************************************************************************
router.post("/createadmin",createAdmin);
router.post("/admin",loginAdmin);


// Export the router for use in the main application
module.exports = router;