const Monggose = require('mongoose')

const FriendSchema = new Monggose.Schema({
  senderId: String,
  receiverId: {
    type: Monggose.Schema.Types.ObjectId,
    ref: 'User'
  },
  time: {
    type: Date,
    default: Date.now()
  }
})

const Friend = Monggose.model('Friend', FriendSchema)

module.exports = Friend
