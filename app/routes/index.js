const express = require('express')
const router = express.Router()
const {addSchedule,listSchedule,updateSchedule,removeSchedule,listFailedSchedule} = require('../controllers/index')
router.post('/add',addSchedule)
router.get('/list',listSchedule)
router.get('/list-failed',listFailedSchedule)
router.put('/update/:id',updateSchedule)
router.delete('/delete/:id',removeSchedule)
module.exports = router