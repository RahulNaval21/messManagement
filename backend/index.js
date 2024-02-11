const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

dotenv.config();
connectDB();

const app = express();

const PORT = 3001;

app.listen(PORT, console.log(`server started ${PORT}`.yellow.bold));
