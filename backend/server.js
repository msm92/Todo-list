const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/task");
const connectDB = require("./config/db");
const authController = require("./controllers/authController");
const app = express();
dotenv.config();

// Midlleware
app.use(cors());
app.use(express.json());

// Connection to mongo
connectDB();

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/login", authController.login);
app.use("/register", authController.register);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
