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
  /**
   * 0: unRead, 1: readed
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

const message = Mongoose.model('Message', MessageSchema)

module.exports = message
