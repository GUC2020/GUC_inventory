const item = require('../models/item')
const user = require('../models/user')
const nodemailer = require('nodemailer');
const email = require('./email')
require('../db/mongoose')
const add_user = (name,email,pass)=>{
    const new_user = new user({
        name:name,
        email:email,
        password:pass
    })
    new_user.save().then(()=>{
        console.log(new_user)
    }).catch((error)=>{
        console.log(error)
    })
}
const find_user = (res)=> {
    let li = []
    user.find({}).then((items)=>{
        
        
    })
    
}

const add_item = (des,nam,quanity,min,max)=>{
    if(min > max){
        return console.log('Min cannot be larger than max')
    }
    const new_item = new item({
        desc:des,
        name:nam,
        quanity:quanity,
        min:min,
        max:max
    })
    new_item.save().then(()=>{
        console.log(new_item)
    }).catch((error)=>{
        console.log(error)
    })
}
// add_item('Ground Coffee','Sunny Days',1,1,5)
const delete_item = (name,desc)=>{
   item.deleteOne({name:name,desc:desc},(err)=>{
       return console.log(err)
   })
}
const update_item = (name,quanity,desc)=>{
    if(!quanity){
        return console.log('no number inputed')
    }
    item.updateOne({desc:desc,name:name},{$set : {quanity:quanity}},(err)=>{
        return console.log(err)
    })
    item.find({desc:desc,name:name}).then((item)=>{
        if(item[0].quanity < item[0].min){
            email.sentEmail()
        }
    })
 } 

 const update_all = (name,quanity,desc,min,max)=>{
    
    if(!quanity && !min && !max){
        return console.log('nothing inputed')
    }
    if(!quanity && !max){
        item.updateOne({desc:desc,name:name},{$set : {min:min}},(err)=>{
            return console.log(err)
        })
        return 
    }
    if(min > max){
        return console.log('Min cannot be larger than max')
    }
    if(!quanity && !min){
        item.updateOne({desc:desc,name:name},{$set : {max:max}},(err)=>{
            return console.log(err)
        })
        return 
    }
    if(!max && !min){
        item.updateOne({desc:desc,name:name},{$set : {quanity:quanity}},(err)=>{
            return console.log(err)
        })
        return 
    }
    if(!quanity){
        item.updateOne({desc:desc,name:name},{$set : {min:min,max:max}},(err)=>{
            return console.log(err)
        })
        return 
    }
    if(!min){
        item.updateOne({desc:desc,name:name},{$set : {quanity:quanity,max:max}},(err)=>{
            return console.log(err)
        })
        return 
    }
    if(!max){
        item.updateOne({desc:desc,name:name},{$set : {quanity:quanity,min:min}},(err)=>{
            return console.log(err)
        })
        return 
    }
    
    else{
        item.updateOne({desc:desc,name:name},{$set : {quanity:quanity,min:min,max:max}},(err)=>{
            return console.log(err)
        })
        return 
    }
 }

exports.add_user = add_user
exports.find_user = find_user
exports.add_item = add_item
exports.delete_item = delete_item
exports.update_item = update_item
exports.update_all = update_all