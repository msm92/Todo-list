const mongoose = require("mongoose");
const Task = require('../Models/Task');

exports.getTasks = async (req, res) => {
    try{
        const tasks = await Task.find();
        res.json({code:1 , tasks})
    } catch (e) {
        res.status(500).json({code: 0 , message: e.message})
    }
}

exports.createTask = async (req, res) => {
    const task = new Task({
        title : req.body.title,
        description : req.body.description,
        dueDate: req.body.dueDate,
        user: mongoose.ObjectId('654874s656a78643a')
    })
    try {
        const newTask = await task.save();
        res.status(201).json({code:1 , message: 'ok' , newTask})
    } catch (err) {
        res.status(400).json({code: 0 , message: err.message});
    }
}
