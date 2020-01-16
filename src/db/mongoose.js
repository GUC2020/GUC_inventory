const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:admin@guc-xkyjr.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,
})






