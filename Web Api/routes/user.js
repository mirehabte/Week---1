const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt') 
const User = require('../models/users')


//Registering user
router.post('/', async (req , res) => {    
    
    const newUser = new User({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        email: req.body.email,
        password: req.body.password
    })
    try {          
        const salt = await bcrypt.genSalt(10)   
        newUser.password = await bcrypt.hash(newUser.password , salt)   
        const result =  await newUser.save()
        res.status(201).json(result)
    } 
    catch(err){
    res.status(400).json({ message: err.message })
     }
})

//Displaying all registered users
router.get('/', async (req,res) => {
    try{
        const users = await User.find()
        res.json(users)
    }catch(err){
        res.status(500).json({ message: err.message })
    }
})

//Displaying one user
router.get('/:id', getUser , async (req,res) => {
res.json(registeredUser)
})

//Updating one user
router.patch('/:id', getUser, async (req,res) => {
    if (req.body.name != null) {
        res.registeredUser.name = req.body.name
      }
      if (req.body.middleName != null) {
        res.registeredUser.middleName = req.body.middleName
      }
      if (req.body.lastName != null) {
          res.registeredUser.lastName = req.body.lastName
      }
      if (req.body.dateOfBirth != null){
          res.registeredUser.dateOfBirth = req.body.dateOfBirth
      }
      if (req.body.email != null){
          res.registeredUser.email = req.body.email
      }
      if(req.body.password != null){
          res.registeredUser.password = req.body.password
      }
      try{
          const updateUser = await res.registeredUser.save()
          res.json(updateUser)
      }catch(err){
          res.status(400).json({ message: err.message})
      }
    })

//Deleting one user 
router.delete('/:id', getUser , async (req,res) => {
   try{
    await res.registeredUser.remove()
    res.json({ "message": "User deleted" })
   }catch(err){
       res.status(500).json({ message: err.message})
   }
})



async function getUser(req,res,next){
    let registeredUser 
try{ 
    registeredUser = await User.findById(req.params.id)
    if(registeredUser == null) res.status(404).json({ "message": "Can not find User"})
}catch(err){
    res.status(500).json({ message: err.message})
}
res.registeredUser = registeredUser
next()
}

   
     
module.exports = router;