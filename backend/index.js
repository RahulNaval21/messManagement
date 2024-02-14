const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const app = express();
const userRoutes = require("./routes/user");
dotenv.config();
connectDB();

app.use(express.json());

// Routes
app.use("/api/v1/auth", userRoutes);

const PORT = 3001;

app.listen(PORT, console.log(`server started ${PORT}`.yellow.bold));
