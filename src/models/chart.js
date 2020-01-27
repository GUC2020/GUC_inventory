//require mongoose for model and validator for added functionality
const mongoose = require('mongoose')
const validator = require('validator')


//model for storing items
const chart = mongoose.model('chart',{
    //can be sauce, syrup, coffee beans, ground coffee, tea, cold brew tea, milk, or fruir
    desc:{
        type:String,
        trim:true,
        required:true
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    quanity:{
        type:Number,
        trim:true,
        required:true
    },
    min:{
        type:Number,
        trim:true,
        required:true
    },
    max:{
        type:Number,
        trim:true,
        required:true
    },
    date:{
        type:Date,
        trim:true,
        required:true
    }
})



module.exports = chart