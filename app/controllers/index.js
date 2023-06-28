const cron = require('node-cron')
const Schedule = require('../models/Schedule')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRIDAPIKEY);
const nodemailer = require('nodemailer');
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
    const list = await Schedule.find({}, { email: 1, scheduledAt: 1, message: 1, name: 1 })
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
    const list = await Schedule.updateOne({ _id: id }, {
        name: name,
        isDeleted: false,
        email: email,
        message: message,
        scheduledAt: milliseconds,
        didSend: false,
        timeStamp: new Date().getTime()
    })
    return res.status(201).json({
        success: true, message: "welcome", list
    })
}
const removeSchedule = async (req, res) => {
    const id = req?.params.id
    const list = await Schedule.updateOne({ _id: id }, { isDeleted: true })
    return res.status(201).json({
        success: true, message: "welcome", list
    })
}

const getEmails = async () => {
    const items = await Schedule.find({ scheduledAt: { $lt: new Date().getTime() }, isDeleted: false, didSend: false })
    var emails = items.map((item)=> {
        return {email: item?.email, message: item?.message}
    })
    return emails
}

const sendEmail = async() => {
    const emails = await getEmails()
    console.log(emails)
    for (item of emails){
        console.log(typeof item.email)
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'code.rakeshkrishnan@gmail.com',
                pass: '*************'
            }
        });
         
        let mailDetails = {
            from: 'xyz@gmail.com',
            to: 'abc@gmail.com',
            subject: 'Test mail',
            text: 'Node.js testing mail for GeeksforGeeks'
        };
         
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
    }
}

cron.schedule('* * * * *', async () => {
    // This function will run every minute
    console.log('Cron job is running');
    sendEmail()
    
});

module.exports = {
    addSchedule, listSchedule, updateSchedule, removeSchedule
}