const cron = require('node-cron')
const Schedule = require('../models/Schedule')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRIDAPIKEY);
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



cron.schedule('* * * * *', async () => {
    // This function will run every minute
    console.log('Cron job is running');
    const items = await Schedule.find({ scheduledAt: { $lt: new Date().getTime() } })
    const msg = {
        to: 'mailrkponline@gmail.com', // recipient's email address
        from: 'code.rakeshkrishnan@gmail.com', // sender's email address
        subject: 'Sending an email using SendGrid',
        text: 'Hello, this is the plain text content of the email.',
        html: '<p>Hello, this is the HTML content of the email.</p>',
    };

    // sgMail.send(msg)
    //     .then(() => {
    //         console.log('Email sent successfully');
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
});

module.exports = {
    addSchedule, listSchedule, updateSchedule, removeSchedule
}