const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt') 
const Staff = require('../models/staffs')


//Registering Staffs members
router.post('/', async (req , res) => {    
    
    const newStaff = new Staff({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        jobTitle: req.body.jobTitle,
        email: req.body.email,
        password: req.body.password
    })
    try {          
        const salt = await bcrypt.genSalt(10)   
        newStaff.password = await bcrypt.hash(newStaff.password , salt)   
        const result =  await newStaff.save()
        res.status(201).json(result)
    } 
    catch(err){
    res.status(400).json({ message: err.message })
     }
})

//Getting all staff members
router.get('/', async (req,res) => {
    try{
    const staff = await Staff.find()
    res.json(staff)
    }catch(err){
        res.status(500).json({ message: err.message })
    }
})

//Getting one staff member
router.get('/:id', getStaff, async (req,res) => {
    res.json(registeredStaff)
})

//Updating one staff member
router.patch('/:id', getStaff, async (req,res) => {
    if (req.body.name != null) {
        res.registeredStaff.name = req.body.name
      }
      if (req.body.middleName != null) {
        res.registeredStaff.middleName = req.body.middleName
      }
      if (req.body.lastName != null) {
        res.registeredStaff.lastName = req.body.lastName
      }
      if(req.body.jobTitle != null){
        res.registeredStaff.jobTitle = req.body.jobTitle
      }
      if (req.body.dateOfBirth != null){
        res.registeredStaff.dateOfBirth = req.body.dateOfBirth
      }
      if (req.body.email != null){
        res.registeredStaff.email = req.body.email
      }
      if(req.body.password != null){
        res.registeredStaff.password = req.body.password
      }
      try{
        const updateStaff = await res.registeredStaff.save()
          res.json(updateStaff)
      }catch(err){
          res.status(400).json({ message: err.message})
      }
})

//Deleting one staff member
router.delete('/:id', getStaff, async (req,res) => {
     try{
        await res.registeredStaff.remove()
        res.json({ "message": "Staff member deleted" })
     }catch(err){
         res.status(500).json({ message: err.message })
     }
})


async function getStaff (req,res,next){
    let registeredStaff
    registeredStaff = await Students.findById (req.params.id)
try{ 
    
    if(registeredStaff == null) res.status(404).json({ "message": "Can not find Staff member" })
}catch(err){
    res.status(500).json({ message: err.message})
}
res.registeredStaff = registeredStaff
next()
}



module.exports = router