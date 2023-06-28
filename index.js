require('dotenv').config()
const express  = require('express')
const app = express()

const router = require('./app/routes/index')
app.use('/api/v1',router)
const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> {console.log('server started on ', PORT)})