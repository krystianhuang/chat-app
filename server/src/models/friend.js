const Monggose = require('mongoose')

const FriendSchema = new Monggose.Schema({
  selfId: String,
  friendId: {
    type: Monggose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isDelete: Boolean,
  time: {
    type: Date,
    default: Date.now()
  }
})

const Friend = Monggose.model('Friend', FriendSchema)

module.exports = Friend
