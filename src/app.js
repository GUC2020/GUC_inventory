if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config() 
  }

// requiring different modules for application
// path for directory managenment 
const path = require('path')
//express for http requests 
const express = require('express')
//initizalize express
const app = express()
//hbs for viewport (i.e. it is the equivilant to what php when displaying html)
const hbs = require('hbs')
//connecting to database
require('./db/mongoose')
//adding in crud functions
const create = require('./util/crud')
const nodemailer = require('nodemailer');
const email = require('./util/email')
//adding in functionality for altering inventory
const item = require('./models/item')
const user = require('./models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const initializePassport = require('./passport-config')
let users   
setInterval(() => {
    user.find({}).then(async (items)=>{
        users = items
    })
}, 5000);

// setTimeout(function(){console.log(users)},2000)
setTimeout(function(){
    initializePassport(
        passport, 
        name => users.find(user => user.name === name)
  )
},2000)
//port to access locally or from online server
const port = process.env.PORT || 3000

//paths(directories) for express to grab elements 
const pubDir = path.join(__dirname,'../public')
const view = path.join(__dirname,'../templates/views')
const partials = path.join(__dirname,'../templates/partials')
//setting up handle bars engine (hbs)and views location using express
app.set('view engine','hbs')
app.set('views',view)
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({ 
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  require('./passport-config')(passport);
  app.use(methodOverride('_method'))
//connecting partials
hbs.registerPartials(partials)
//static directory to serve (this is the information that is always sent)
app.use(express.static(pubDir))


//path for render
app.get('',checkAuthenticated,(req,res)=>{
    res.render('index',{
    })
    console.log(req.user)
})
app.get('/',checkAuthenticated,(req,res)=>{
    res.render('index',{
    })
    console.log(req.user)
})
app.get('/login',checkNotAuthenticated,(req,res)=>{
    res.render('login',{
    })
    
})
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/manager',
    failureRedirect: '/login', 
    failureFlash: true
  }))
app.get('/manager',checkAuthenticated, checkAdmin,(req,res)=>{
    res.render('manager',{
    })
    
})
//send whole inventory to browser 
app.get('/items',(req,res)=>{
    var li 
    const all_items = item.find({}).then((items)=>{
        li = items
         
        // console.log(li[0].name)
        res.send({
            items:li
        })
    })
}) 
app.get('/delete',(req,res)=>{
    if(req.error){
        return res.send({
            error:'This is not a valid request.'
        })
    }
    create.delete_item(req.query.nam,req.query.desc)
    console.log("it's dead")
    
})
app.get('/create',(req,res)=>{
    if(req.error){
        return res.send({
            error:'This is not a valid request.'
        })
    }
    create.add_item(req.query.desc,req.query.nam,req.query.quan,req.query.min,req.query.max)
    console.log('thank god first Try')
})
  
app.get('/update',(req,res)=>{
    if(req.error){
        return res.send({
            error:'This is not a valid request.'
        })
    }
    create.update_item(req.query.name,req.query.quanity,req.query.desc)
    console.log('worked')
})

app.get('/update_full',(req,res)=>{
    if(req.error){
        return res.send({
            error:'This is not a valid request.'
        })
    }
    create.update_all(req.query.name,req.query.quanity,req.query.desc,req.query.min,req.query.max)
    console.log('worked')
    res.send({
        li:'hi'
    })
})
app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register')
  })
  
app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      create.add_user(req.body.name, req.body.email, hashedPassword)
      res.redirect('/login')
    } catch {
        console.log('nope')
      res.redirect('/register')
    }
})


app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })

  function checkAuthenticated(req, res, next) {
      
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }

  function checkAdmin(req, res, next) {
      console.log(req.user)
    if (req.user !== 'admin') {
        return res.redirect('/')
    }
    next()
  }

//running the port
app.listen(port, ()=>{
    console.log('Server is up on port '+ port)
}) 