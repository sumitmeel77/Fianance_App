const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false, // when accessing user inforamtion because of false it will not be accessed by api
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {  //for comparing password
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.getJwtToken = function () {   // for creating jwt token
    return jwt.sign({ id: this._id }, "rwhfbfbufbhsbdfjshbfuwgrhwbfsbfhwbfuybfh", {
        expiresIn: "2d",
    });
};

module.exports = mongoose.model("User", userSchema);