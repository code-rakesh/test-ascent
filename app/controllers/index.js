const Schedule = require('../models/Schedule')
const addSchedule = async (req, res) => {
    const { name, email, message, scheduledAtDay, scheduledAtTime } = req?.body
    const exactTime = scheduledAtDay + "  " + scheduledAtTime
    console.log(exactTime)
    const milliseconds = new Date(exactTime).getTime()
    const newObject = new Schedule({
        name: name,
        isDeleted: false,
        email: email,
        message: message,
        scheduledAt: milliseconds,
        didSend: false,
        timeStamp: new Date().getTime()
    })
    await newObject.save()
    return res.status(201).json({
        success: true, message: "welcome"
    })
}
const listSchedule = async (req, res) => {
    const list = await Schedule.find({},{email:1,scheduledAt:1, message:1, name:1})
    return res.status(200).json({
        success: true, message: "welcome", list
    })
}
const updateSchedule = async (req, res) => {
    const id = req?.params.id
    const { name, email, message, scheduledAtDay, scheduledAtTime } = req?.body
    const exactTime = scheduledAtDay + "  " + scheduledAtTime
    console.log(exactTime)
    const milliseconds = new Date(exactTime).getTime()
    const list = await Schedule.updateOne({_id:id},{name: name,
        isDeleted: false,
        email: email,
        message: message,
        scheduledAt: milliseconds,
        didSend: false,
        timeStamp: new Date().getTime()})
    return res.status(201).json({
        success: true, message: "welcome", list
    })
}
const removeSchedule = async (req, res) => {
    const id = req?.params.id
    const list = await Schedule.updateOne({_id:id},{isDeleted:true})
    return res.status(201).json({
        success: true, message: "welcome", list
    })
}
module.exports = {
    addSchedule,listSchedule,updateSchedule, removeSchedule
}