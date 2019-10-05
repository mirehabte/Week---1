const mongoose = require('mongoose')
const validator = require('validator')


const staffSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    middleName: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    lastName: {
        type: String,
        minlength: 5,
        maxlength: 50, 
        required: true 
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 250,
        unique: true,
        required: true,
        validate: value => {
            if(!validator.isEmail(value))
            throw new Error ({ error: 'Invalid email'})            
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    isAdmin:{
        type: Boolean,
        default: false
    } 
})

module.exports = mongoose.model('Staff' , staffSchema)
