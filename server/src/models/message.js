const Mongoose = require('mongoose')

const MessageSchema = new Mongoose.Schema({
  roomId: String,
  senderId: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  senderName: String,
  senderAvatar: String,
  message: String,
  messageType: String,
  time: {
    type: Date,
    default: Date.now
  }
})

const message = Mongoose.model('Message', MessageSchema)

module.exports = message
