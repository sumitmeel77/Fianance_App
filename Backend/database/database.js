const mongoose = require("mongoose")

const connectDatabase = () => {
    mongoose.connect("mongodb+srv://username:w8qTlnX9t2hsu9BY@cluster0.s8iv7.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => { console.log("connection successfull with database") })
}


module.exports = connectDatabase
