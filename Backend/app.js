const express = require("express")
const cookieParser = require("cookie-parser")
const errorHandler = require("./middleware/error")

const app = express()
app.use(express.json())

var cors = require('cors')

app.use(cors())

app.use(cookieParser())

const user = require("./routers/userRoute")
app.use("/api", user)

const expense = require("./routers/expenseRoute")
app.use("/api", expense)

const bank = require("./routers/bankRoute")
app.use("/api", bank)

app.use(errorHandler)

module.exports = app