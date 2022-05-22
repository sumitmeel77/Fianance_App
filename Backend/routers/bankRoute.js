const express = require("express")
const { getAllBanks, getBankDetail } = require("../controllers/bankControllers")
const { AuthenticatedUser } = require("../middleware/auth")

const router = express.Router()

router.route("/banks").get(AuthenticatedUser, getAllBanks)//api for getting all bank

router.route("/bank/get/:id").get(AuthenticatedUser, getBankDetail)// api for getting bank detail


module.exports = router