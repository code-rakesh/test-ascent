const Schedule = require('../models/Schedule')
const nodemailer = require('nodemailer');
const client = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "code.rakeshkrishnan@gmail.com",
        pass: process.env.MAILPASSWORD
    }
});
function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}

const validate = async (body) => {
    const { name, email, message, scheduledAtDay, scheduledAtTime } = body
    const errors = []
    if (message.length < 3) {
        errors.push({
            fielld:"email", message:"don't have enough size"
        })
    }
    if (!scheduledAtDay){
        errors.push({
            fielld:"scheduledAtDay", message:"don't have shccheduled day"
        })
    }
    if (!scheduledAtTime){
        errors.push({
            fielld:"scheduledAtDay", message:"don't have shcheduled time"
        })
    }
    if (!email){
        errors.push({
            fielld:"email", message:"don't have email specified"
        })
    }
    if (!ValidateEmail(email)) {
        errors.push({
            fielld:"email", message:"email is not in valid format"
        })
    }

    const exactTime = scheduledAtDay + "  " + scheduledAtTime
    
    const milliseconds = new Date(exactTime).getTime()
    if (!milliseconds){
        errors.push({
            field:"date", message:"date and time not in proper format"
        })
    }
    const millisecondsNow = new Date().getTime()
    if (milliseconds < millisecondsNow) {
        errors.push({
            field:"date", message:"date looks like past"
        })
    }
    return errors
}



module.exports = {
    validate
}