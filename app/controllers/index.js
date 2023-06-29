const cron = require('node-cron')
const Schedule = require('../models/Schedule')
const {addScheduleService, updateScheduleService, removeScheduleService, listScheduleService,listScheduleFailedService, sendEmail} = require('../services/index.service')
const {validate} = require('../services/validaeService')




const addSchedule = async (req, res) => {
    try {
        
        const arr = await validate(req.body)
        console.log(arr)
        if (arr?.length > 0) {
            return res.json({
                success: false, message: "validation failed",data: arr
            })
        }
        const data = await addScheduleService(req.body)
        return res.status(201).json({
            success: true, message: "welcome",data: data
        })
    } catch (error) {
        return res.status(400).json({
            success: false, message: "unknown error",data: error
        })
    }
    
}
const listSchedule = async (req, res) => {
    try {
        const data = await listScheduleService(req?.query)
        return res.status(200).json({
            success: true, message: "welcome",data: data
        })
    } catch (error) {
        return res.status(400).json({
            success: false, message: "unknown error",data: error
        })
    }
}

const listFailedSchedule = async (req, res) => {
    try {
        const data = await listScheduleFailedService(req?.query)
        return res.status(200).json({
            success: true, message: "welcome",data: data
        })
    } catch (error) {
        return res.status(400).json({
            success: false, message: "unknown error",data: error
        })
    }
}
const updateSchedule = async (req, res) => {
    const id = req?.params.id
    try {
        const arr = validate(req.body)
        if (arr?.length > 0) {
            return res.json({
                success: false, message: "validation failed",data: arr
            })
        }
        const data = await updateScheduleService(id, req.body)
        
        return res.status(201).json({
            success: true, message: "welcome",data: data
        })
    } catch (error) {
        return res.status(400).json({
            success: false, message: "unknown error",data: error
        })
    }
}
const removeSchedule = async (req, res) => {
    try {
       
        const data = await removeScheduleService(id)
        
        return res.status(201).json({
            success: true, message: "welcome",data: data
        })
    } catch (error) {
        return res.status(400).json({
            success: false, message: "unknown error",data: error
        })
    }
}


cron.schedule('* * * * *', async () => {
    // This function will run every minute
    console.log('Cron job is running', new Date());
    sendEmail()
    
});

module.exports = {
    addSchedule, listSchedule, updateSchedule, removeSchedule,listFailedSchedule
}