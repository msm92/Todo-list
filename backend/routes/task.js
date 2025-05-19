const express = require("express");
const router = express.Router();
const Task = require("../Models/Task");
const taskController = require("../Controllers/TaskController");
const mongoose = require("mongoose");
const auth = require("../middleware/authMiddleware");
/**
 * get all tasks
 */
router.get("/", auth, taskController.getTasks);
router.post("/", auth, taskController.createTask);

module.exports = router;
