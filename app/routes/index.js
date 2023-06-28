const express = require('express')
const router = express.Router()
const {addSchedule} = require('../controllers/index')
router.get('/test',addSchedule)

module.exports = router