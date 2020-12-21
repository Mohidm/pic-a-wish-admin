const express = require("express")
const router = express.Router()
const passport = require("passport")
const jwt = require("jsonwebtoken")
const Admin = require("../models/admin")
const config = require("../config/db")
// Register

router.post('/register',(req,res,next)=>{
   let newUser = new Admin({
       name:req.body.name,
       email:req.body.email,
       password:req.body.password
   })
   Admin.addAdminUser(newUser,(err, user)=>{
    if(err){
        res.json({success:false, msg:"Failed to register"})
    }else{
        res.json({success:true, msg:"User registered"})
    }
})
})


// Authenticate

router.post('/authenticate',(req,res,next)=>{
   const email = req.body.email
   const password = req.body.password
   Admin.getAdminUserByEmail(email, (err,user)=>{
       if(err) throw err
       if(!user){
           return res.status(401).send("Wrong Email!!")
       }
       Admin.comparePassword(password, user.password,(err,isMatch)=>{
           if(err) throw err
           if(isMatch){
               const token = jwt.sign({user}, config.secret,{
                   expiresIn:'1h'
               })
               res.json({
                   success:true,
                   token:`Bearer ${token}`,
                   expiry:3600,
                   user:{
                       id:user._id,
                       name:user.name,
                       email:user.email
                   }
               })
           }else{
            return res.status(401).send("Wrong Password!!")
           }

           
       })
   })
})

// Profile
router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    res.json({
        user: {
          _id: req.user._id,
          name: req.user.name,
          username: req.user.username,
          email: req.user.email,
        }
      })
})

// Validate
router.get('/validate',(req,res,next)=>{
    res.send('Validate')
})

module.exports = router