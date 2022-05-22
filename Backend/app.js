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

app.use(errorHandler)

module.exports = app