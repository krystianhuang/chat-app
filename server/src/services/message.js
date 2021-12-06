const Message = require('../models/message')

const get = message => {
  const res = Message.find(message)
  return res
}

const createMany = messages => {
  const res = Message.insertMany(messages)
  return res
}

module.exports = { get, createMany }
