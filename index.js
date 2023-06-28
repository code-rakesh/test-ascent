require('dotenv').config()
const express  = require('express')
const mongoose = require('mongoose');
const uri = process.env.DB_STRING
console.log(uri)
const app = express()
mongoose.connect(
    process.env.DB_STRING, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then((res)=> console.log('connected to database')).catch(err=> console.log(err.message))
const router = require('./app/routes/index')
app.use(express.json())
app.use('/api/v1',router)
const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> {console.log('server started on ', PORT)})