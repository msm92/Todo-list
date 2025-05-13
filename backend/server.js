const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/task')
const connectDB = require('./config/db');
const app = express();
dotenv.config();

// Midlleware
app.use(cors());
app.use(express.json());

// Connection to mongo
connectDB();

// Routes
app.use('/api/tasks' , taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`))
