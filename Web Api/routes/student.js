const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt') 
const Students = require('../models/students')


//Registering Students
router.post('/', async (req , res) => {    
    
    const newStudent = new Students({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        studentId: req.body.studentId,
        dateOfBirth: req.body.dateOfBirth,
        email: req.body.email,
        password: req.body.password
    })
    try {          
        const salt = await bcrypt.genSalt(10)   
        newStudent.password = await bcrypt.hash(newStudent.password , salt)   
        const result =  await newStudent.save()
        res.status(201).json(result)
    } 
    catch(err){
    res.status(400).json({ message: err.message })
     }
})


//Getting all students
router.get('/', async (req,res) => {
    try{
    const students = await Students.find()
    res.json(students)
    }catch(err){
        res.status(500).json({ message: err.message })
    }
})


//Getting one student
router.get('/:id', getStudent, async (req,res) => {
    res.json(registeredStudent)
})


//Updating one student
router.patch('/:id', getStudent, async (req,res) => {
    if (req.body.name != null) {
        res.registeredStudent.name = req.body.name
      }
      if (req.body.middleName != null) {
        res.registeredStudent.middleName = req.body.middleName
      }
      if (req.body.lastName != null) {
          res.registeredStudent.lastName = req.body.lastName
      }
      if(req.body.studentId != null){
          res.registeredStudent.studentId = req.body.studentId
      }
      if (req.body.dateOfBirth != null){
          res.registeredStudent.dateOfBirth = req.body.dateOfBirth
      }
      if (req.body.email != null){
          res.registeredStudent.email = req.body.email
      }
      if(req.body.password != null){
          res.registeredStudent.password = req.body.password
      }
      try{
          const updateStudent = await res.registeredStudent.save()
          res.json(updateStudent)
      }catch(err){
          res.status(400).json({ message: err.message})
      }
})


//Deleting one student
router.delete('/:id', getStudent, async (req,res) => {
     try{
        await res.registeredStudent.remove()
        res.json({ "message": "Student deleted"})
     }catch(err){
         res.status(500).json({ message: err.message })
     }
})


async function getStudent (req,res,next){
    let registeredStudent
    registeredStudent = await Students.findById (req.params.id)
try{ 
    
    if(registeredStudent == null) res.status(404).json({ "message": "Can not find Student"})
}catch(err){
    res.status(500).json({ message: err.message})
}
res.registeredStudent = registeredStudent
next()
}



module.exports = router