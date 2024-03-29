const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const app = express();
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const cookieParser = require("cookie-parser");

dotenv.config();
connectDB();

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/admin",adminRoutes);

const PORT = 3001;

app.listen(PORT, console.log(`server started ${PORT}`.yellow.bold));
