//require mongoose for model and validator for added functionality
const mongoose = require('mongoose')
const validator = require('validator')


//model for storing User
const User = mongoose.model('User',{
    //can be sauce, syrup, coffee beans, ground coffee, tea, cold brew tea, milk, or fruir
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    }
})



module.exports = User