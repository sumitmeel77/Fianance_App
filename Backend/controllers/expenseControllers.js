const Expense = require("../models/expenseModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const apiFeatures = require("../utils/apiFeatures")

//create expense
exports.createExpense = catchAsyncError(

    async (req, res, next) => {

        req.body.user = req.user.id // for adding which admin created expense

        const expense = await Expense.create(req.body)
        res.status(200).json({
            success: true,
            expense
        })
    }
)
//get All expenses
exports.getAllExpenses = catchAsyncError(

    async (req, res) => {
        const resultPerPage = 10
        const expenseCount = await Expense.countDocuments() // method for calcualtion count of expense

        const apiFeature = new apiFeatures(Expense.find(), req.query).serach().filter().pagination(resultPerPage)

        const expenses = await apiFeature.query
        res.status(200).json({
            success: true,
            expenses,
            expenseCount
        })
    }
)

//get expense detail
exports.getExpenseDetail = catchAsyncError(
    async (req, res, next) => {
        const expense = await Expense.findById(req.params.id)

        if (!expense) {
            // return res.status(200).json({
            //     success: true,
            //     message: "expense not found"
            // })
            return next(new ErrorHandler("expense not found", 404))
        }

        res.status(200).json({
            success: true,
            expense
        })
    }
)

//update expense
exports.UpdateExpense = catchAsyncError(
    async (req, res, next) => {
        let expense = Expense.findById(req.params.id)
        if (!expense) {
            return next(new ErrorHandler("expense not found", 404))
        }
        newExpense = await Expense.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true,
                runValidators: true,
                useFindandModifiy: false
            })

        res.status(200).json({
            success: true,
            newExpense
        })
    }
)

//deleting expense
exports.DeleteExpense = catchAsyncError(async (req, res, next) => {
    let expense = await Expense.findByIdAndUpdate(req.params.id)
    if (!expense) {
        return next(new ErrorHandler("expense not found", 404))
    }
    await expense.remove();

    res.status(200).json({
        success: true,
        message: "expense deleted successfully"
    })
})
