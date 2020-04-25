const item = require('../models/item')
const user = require('../models/user')
const chart = require('../models/chart')
const nodemailer = require('nodemailer');
const email = require('./email')
const schedule = require('node-schedule');
require('../db/mongoose')

const add_chart = (des,nam,quanity,min,max,date)=>{
    if(min > max){
        return console.log('Min cannot be larger than max')
    }
    const new_chart = new chart({
        desc:des,
        name:nam,
        quanity:quanity,
        min:min,
        max:max,
        date:date
    })
    new_chart.save().then(()=>{
        console.log(new_chart)
    }).catch((error)=>{
        console.log(error)
    })
}
let d = new Date();
  schedule.scheduleJob('0 0 * * *', () => { 
    item.find({}).then((items)=>{
        items.forEach(element => {
            add_chart(element.desc,element.name,element.quanity,element.min,element.max,d);
        });
    })
   })
 
//   schedule.scheduleJob('38 15 * * *', () => { 
//     item.find({}).then((items)=>{
//                     items.forEach(element => {
//                         add_chart(element.desc,element.name,element.quanity,element.min,element.max,d);
//                     });
//                 })
//   })


const add_user = (name,admin,pass)=>{
    name.toLowerCase()
    const new_user = new user({
        name:name,
        admin:admin,
        password:pass
    })
    new_user.save().then(()=>{
        console.log(new_user)
    }).catch((error)=>{
        console.log(error)
    })
}
const find_user = (name)=> {
    user.find({name:name}).then((items)=>{
        return items
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
const delete_user = (name)=>{
    user.deleteOne({name:name},(err)=>{
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
exports.delete_user = delete_user
exports.add_item = add_item
exports.delete_item = delete_item
exports.update_item = update_item
exports.update_all = update_all