const Message = require('../models/message')

const get = message => {
  const res = Message.find(message)
  return res
}

const createMany = messages => {
  const res = Message.insertMany(messages)
  return res
}

const deleteOne = message => {
  const res = Message.deleteOne(message)
  console.log('message', message)
  return res
}

module.exports = { get, createMany, deleteOne }
