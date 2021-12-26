const ValidateMessages = require('../models/validateMessages')

const get = data => {
  const res = ValidateMessages.find(data)
  return res
}

const create = data => {
  const res = ValidateMessages.create(data)
  return res
}

const update = data => {
  const { roomId, senderId, receiverId, status } = data
  const res = ValidateMessages.updateMany(
    { roomId, senderId, receiverId },
    {
      $set: {
        status
      }
    }
  )
  return res
}

module.exports = {
  get,
  create,
  update
}
