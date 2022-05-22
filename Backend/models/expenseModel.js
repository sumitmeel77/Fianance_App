const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter expense Name"],
        trim: true,//for removing whitespaces
    },
    description: {
        type: String
    },
    amount: {
        type: Number,
        required: [true, "Please Enter expense Amount"],
        maxLength: [8, "Amount cannot exceed 8 characters"],
    },
    category: {
        type: String,
        required: [true, "Please Enter Expense Category"],
        default: "household",
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Expense", expenseSchema);