const Mongoose = require('mongoose')

const MessageSchema = new Mongoose.Schema({
  reportName: String,
  userId: String,
  name: String,
  avatar: String,
  reason: String,
  /**
   *  0 :default, 1: pass , 2: no pass
   */
  status: {
    type: Number,
    default: 0
  },
  time: {
    type: Date,
    default: Date.now
  }
})

const message = Mongoose.model('report', MessageSchema)

module.exports = message
