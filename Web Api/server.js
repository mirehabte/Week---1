require('dotenv').config()

const express = require('express')
const app = express()
const userRouter = require('./routes/user')
const loginRouter = require('./routes/login')
const studentRouter = require('./routes/student')
const staffRouter = require('./routes/staff')

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/WebApi' , { useNewUrlParser: true , useUnifiedTopology: true})
.then(() => console.log('Connected to Database ....'))
.catch((err) => console.error('Failed to connect' , err))

app.use(express.json())

app.use('/api/user' , userRouter)
app.use('/api/login' , loginRouter)
app.use('/api/student' , studentRouter)
app.use('/api/staff', staffRouter)



app.listen(process.env.PORT || 4000, () => console.log('Server Listening on port 4000'))



