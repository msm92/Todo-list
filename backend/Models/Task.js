const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'complete'],
        default: 'pending',
    },
    dueDate: {
        type: Date,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},{ timestamps: true });

module.exports = mongoose.model('Task', taskSchema);