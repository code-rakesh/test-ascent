const Schedule = require('../models/Schedule')
const nodemailer = require('nodemailer');
const client = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "code.rakeshkrishnan@gmail.com",
        pass: process.env.MAILPASSWORD
    }
});
const addScheduleService = async (body) => {
    const { name, email, message, scheduledAtDay, scheduledAtTime } = body
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
    return newObject
}

const listScheduleService = async (query) => {
    const page = query?.page || 1
    const limit = query?.limit || 10
    const skip = (page-1) * limit
    const list = await Schedule.find({}, { email: 1, scheduledAt: 1, message: 1, name: 1 }).skip(skip).limit(limit)
    return list
}

const listScheduleFailedService = async (query) => {
    const page = query?.page || 1
    const limit = query?.limit || 10
    const skip = (page-1) * limit
    const list = await Schedule.find({didFailed:true}, { email: 1, scheduledAt: 1, message: 1, name: 1,failureReason:1 }).skip(skip).limit(limit)
    return list
}


const updateScheduleService = async (id,body) => {
    
    const { name, email, message, scheduledAtDay, scheduledAtTime } = body
    const exactTime = scheduledAtDay + "  " + scheduledAtTime
    console.log(exactTime)
    const milliseconds = new Date(exactTime).getTime()
    const object = await Schedule.updateOne({ _id: id }, {
        name: name,
        isDeleted: false,
        email: email,
        message: message,
        scheduledAt: milliseconds,
        didSend: false,
        timeStamp: new Date().getTime()
    })
    return object
}

const removeScheduleService = async (id) => {
    const object = await Schedule.updateOne({ _id: id }, { isDeleted: true })
    return object
}

const getEmails = async () => {
    console.log(new Date().getTime())
    const items = await Schedule.find({  isDeleted: false, didSend: false })
    const emails = items.map((item)=> {
        return {email: item?.email, message: item?.message, id:item._id, scheduledAt: item?.scheduledAt}
    })
    const emails_filtered =  emails.filter(email => {
        const timenow = new Date().getTime()
        console.log(email.scheduledAt, timenow, timenow + 60000)
        console.log(email.scheduledAt < (timenow + 60000), email.scheduledAt > (timenow))
        if (email.scheduledAt < (timenow + 60000) && email.scheduledAt > (timenow)) {
            return true
        }
        return false
    })
    return emails_filtered
}

const sendEmail = async() => {
    const emails = await getEmails()
    for (var item of emails) {
        console.log('item',item)
        try {
            const send_email = await client.sendMail(
                {
                    from: "code.rakeshkrishnan@gmail.com",
                    to: item.email,
                    subject: "test email",
                    text: item.message
                }
            )
            console.log(send_email)
            const updated = await Schedule.updateOne({_id: item.id}, {didSend:true})
            console.log(updated)
        } catch (error) {
            const updated = await Schedule.updateOne({_id: item.id}, {didSend:true, didFailed:true, failureReason:error.message})
            console.log(updated)
        }
        
        
    }
}


module.exports = {
    addScheduleService, listScheduleService, updateScheduleService, removeScheduleService,sendEmail,listScheduleFailedService
}