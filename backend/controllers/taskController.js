const mongoose = require("mongoose");
const Task = require("../Models/Task");

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json({ code: 1, tasks });
    } catch (e) {
        res.status(500).json({ code: 0, message: e.message });
    }
};

exports.getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.json({ code: 1, msg: "عملیات با موفقیت انجام شد." });
    } catch (error) {
        res.json({ code: 0, msg: error.message });
    }
};

exports.createTask = async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        user: req.body.user,
    });
    try {
        const newTask = await task.save();
        res.status(201).json({ code: 1, message: "ok", newTask });
    } catch (err) {
        res.status(400).json({ code: 0, message: err.message });
    }
};

exports.edit = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res
                .status(404)
                .json({ code: 0, msg: "خطا در انجام عملیات" });
        }
        res.json({ code: 1, task });
    } catch (err) {
        res.status(500).json({ code: 0, message: err.message });
    }
};

exports.delete = async (req, res) => {
    let task = await Task.findById(req.params.id);
    if (!task) {
        return res.json({ code: 0, msg: "خطا در انجام عملیات" });
    }

    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ code: 0, msg: "عملیات با موفقیت انجام شد." });
    } catch (error) {
        res.status(500).json({ code: 0, msg: error.message });
    }
};
