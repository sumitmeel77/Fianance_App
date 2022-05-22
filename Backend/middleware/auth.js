const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

const JWT_SECRET = "rwhfbfbufbhsbdfjshbfuwgrhwbfsbfhwbfuybfh";

exports.AuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please Login to access ", 401));
    }
    const decodedData = jwt.verify(token, JWT_SECRET);

    req.user = await User.findById(decodedData.id); //Imp concept to store user profile 

    next();
});