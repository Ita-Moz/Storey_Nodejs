const mongoose = require('mongoose')    
const accountUser = mongoose.Schema({
    
    tennguoidung : {
        type : String,
        require: true
    },
    tentaikhoan : {
        type : String,
        require: true
    },
    matkhau : {
        type : String,
        require: true
    },
    email : {
        type : String,
        require: true
    },
})
module.exports =  mongoose.model( 'account_user' , accountUser)