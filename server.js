//for all the environment variables
require('dotenv').config()
const port = process.env.port || 2022

//getting required modules
const express = require('express')
const app = express()
const mongoose = require('mongoose')


//middleware
app.use(express.json({extended: false}))


//functional routes
const buyersroute = require('./routes/buyers')
app.use('/buyers', buyersroute)


//connection with database
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true})
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))


//response from server
app.listen(port, (err) => {
    if(err) throw err
    console.log('Server is listening to port ' + port)
})