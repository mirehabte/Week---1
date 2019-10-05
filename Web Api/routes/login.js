const express = require('express')
const router = express.Router()
const User = require('../models/users')
const Staff = require('../models/staffs')
const Student = require('../models/students')
const bcrypt = require('bcrypt')


//ALL LOGIN ACCOUNTS 


//Login for users
router.post('/user', async(req,res) => { 
const user = await User.findOne({ email:req.body.email});
if(!user) return  res.status(400).json({ "message": "invalid email"});       

const result = await bcrypt.compare(req.body.password, user.password);
if (result) {
   res.status(200).json({ "message": "user logged in"});        
} 
else { 
    res.json({"message":"Incorrect password"})      
     }      
})


//Login for Staff members
router.post('/staff', async(req,res) => { 
     const user = await Staff.findOne({ email:req.body.email});
     if(!user) return  res.status(400).json({ "message": "invalid email"});       
     
     const result = await bcrypt.compare(req.body.password, user.password);
     if (result) {
        res.status(200).json({ "message": "Staff member logged in"});        
     } 
     else { 
         res.json({"message":"Incorrect password"})      
          }      
     })


//Login for Students 
     router.post('/student', async(req,res) => { 
          const user = await Student.findOne({ email:req.body.email});
          if(!user) return  res.status(400).json({ "message": "invalid email"});       
          
          const result = await bcrypt.compare(req.body.password, user.password);
          if (result) {
             res.status(200).json({ "message": "Student logged in"});        
          } 
          else { 
              res.json({"message":"Incorrect password"})      
               }      
          })


//Login for Admin
router.post('/staff/admin', async(req,res) => { 
     const user = await Staff.findOne({ email:req.body.email});
     if(!user) return  res.status(400).json({ "message": "invalid email"});       
     
     const result = await bcrypt.compare(req.body.password, user.password);
     const isAdmin = await Staff.findOne({ isAdmin: true })
     if (result && isAdmin) {
        res.status(200).json({ "message": "Admin logged in"});        
     } 
     else { 
         res.json({"message":"Incorrect password"})      
          }      
     })

               
module.exports = router