const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  name: String,
  isDeleted:Boolean,
  email: String,
  message:String,
  scheduledAt:Number,
  didSend:Boolean,
  timeStamp: Number,
});
const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule
