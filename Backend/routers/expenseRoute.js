const express = require("express")
const { getAllExpenses, createExpense, UpdateExpense, DeleteExpense, getExpenseDetail } = require("../controllers/expenseControllers")
const { AuthenticatedUser } = require("../middleware/auth")

const router = express.Router()

router.route("/expenses").get(getAllExpenses)//api for getting all expense

router.route("/admin/expense/new").post(AuthenticatedUser, createExpense) // api for creating new expense

router.route("/admin/expense/update/:id").put(AuthenticatedUser, UpdateExpense)// api for updating expense

router.route("/admin/expense/delete/:id").delete(AuthenticatedUser, DeleteExpense)// api for deleting expense

router.route("/expense/get/:id").get(getExpenseDetail)// api for getting expense detail


module.exports = router