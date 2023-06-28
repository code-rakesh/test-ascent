const express = require('express')
const router = express.Router()

router.get('/test',(req, res)=> {console.log('reached router') })

module.exports = router