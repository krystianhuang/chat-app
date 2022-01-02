const ValidateMessages = require('../models/validateMessages')
const { toMongoId } = require('../utils/mongoose')

const get = data => {
  const res = ValidateMessages.find(data)
  return res
}

const create = data => {
  const res = ValidateMessages.create(data)
  return res
}

const update = data => {
  const { _id, roomId, senderId, receiverId, status } = data
  const res = ValidateMessages.updateOne(
    { _id: toMongoId(_id), roomId, senderId, receiverId },
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
