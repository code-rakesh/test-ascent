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

module.exports = {
    addSchedule
}