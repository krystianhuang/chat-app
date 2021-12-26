const Monggose = require('mongoose')

const ValidateMessagesSchema = new Monggose.Schema({
  roomId: String,
  senderId: {
    type: Monggose.Schema.Types.ObjectId
  },
  reciverId: {
    type: Monggose.Schema.Types.ObjectId
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  validateMessage: String,
  /** 0-同意，1-不同意，2-未處理
   */
  status: {
    type: Number,
    default: 2
  },
  /** 0-好友，1-群聊 */
  validateType: Number,
  groupId: {
    type: Monggose.Schema.Types.ObjectId,
    ref: 'group'
  }
})

const ValidateMessages = Monggose.model(
  'ValidateMessages',
  ValidateMessagesSchema
)

module.exports = ValidateMessages
