const mongoose = require('mongoose')

const GoalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title:{
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxLength: 50
    },
    targetAmount:{
        type: Number,
        required: [true, "Target Amount is required"],
        trim: true,
        maxLength: 50
    },
    deadLine:{
        type: Date,
        required: [true, "Deadline is required"],
        trim: true,
        maxLength: 50
    },
    purpose: {
        type: String,
        required: [true, ""]
    }
}, { timestamps: true })

module.exports = mongoose.model("Goal", GoalSchema)