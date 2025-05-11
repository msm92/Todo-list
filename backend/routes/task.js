const express = require('express');
const router = express.Router();
const Task = require('../Models/Task');
const taskController = require('../Controllers/TaskController');
const mongoose = require("mongoose");
/**
 * get all tasks
 */
router.get('/',taskController.getTasks)
router.post('/',taskController.createTask)

module.exports = router;