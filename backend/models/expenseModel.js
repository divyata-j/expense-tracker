const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: [true, "Specify the amount"],
        maxLength: 20,
        trim: true
    },
    type: {
        type: String,
        default: "expense"
    },
    date: {
        type: Date,
        required: [true, " Mention date"],
        trim: true
    },
    category: {
        type: String,
        required: [true, "choose the category"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "if any specify otherwise specify no"],
        maxLength: 20,
        trim: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Expense', ExpenseSchema)