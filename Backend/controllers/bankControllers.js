const Bank = require("../models/expenseModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const apiFeatures = require("../utils/apiFeatures")

//get All expenses
exports.getAllBanks = catchAsyncError(

    async (req, res) => {
        const resultPerPage = 10
        // const expenseCount = await Bank.countDocuments() // method for calcualtion count of expense

        const apiFeature = new apiFeatures(Bank.find(), req.query).serach().filter().pagination(resultPerPage)

        const banks = await apiFeature.query
        res.status(200).json({
            success: true,
            banks
        })
    }
)

//get expense detail
exports.getBankDetail = catchAsyncError(
    async (req, res, next) => {
        const bank = await Bank.findById(req.params.id)

        if (!bank) {
            return next(new ErrorHandler("expense not found", 404))
        }

        res.status(200).json({
            success: true,
            bank
        })
    }
)



