const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, " bank Name"],
        trim: true,//for removing whitespaces
    },
    description: {
        type: String
    },
    amount: {
        type: Number,
        required: [true, " bank Amount"],
        maxLength: [8, "Amount cannot exceed 8 characters"],
    },
    expense: {
        type: Number,
        required: [true, " bank expense"],
        maxLength: [8, "Amount cannot exceed 8 characters"],
    },
    category: {
        type: String,
        required: [true, " expense Category"],
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

module.exports = mongoose.model("Bank", bankSchema);