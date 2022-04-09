const Message = require('../models/message')

const get = message => {
  const res = Message.find(message)
  return res
}

const getCount = message => {
  const res = Message.find(message).count()
  return res
}

const createMany = messages => {
  const res = Message.insertMany(messages)
  return res
}

const deleteOne = message => {
  const res = Message.deleteOne(message)
  return res
}

const update = message => {
  const res = Message.updateMany(
    { roomId: message.roomId },
    { status: message.status }
  )
  return res
}

module.exports = { get, getCount, createMany, update, deleteOne }
