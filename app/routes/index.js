const express = require('express')
const router = express.Router()
const {addSchedule,listSchedule,updateSchedule,removeSchedule} = require('../controllers/index')
router.post('/test',addSchedule)
router.get('/list',listSchedule)
router.put('/update/:id',updateSchedule)
router.delete('/delete/:id',removeSchedule)
module.exports = router