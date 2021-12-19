const Message = require('../services/message')
const { successResponse, errorResponse } = require('../utils/util')
const { model } = require('mongoose')

const insetMessages = async messages => {
  const [data] = await Message.createMany(messages)
  return data
}

const getRecentMessages = async (req, res) => {
  const { roomId } = req.query
  const page = Number(req.query.page) - 1
  const pageSize = Number(req.query.pageSize)
  console.log('roomId', roomId)
  try {
    const data = await Message.get({ roomId })
      .skip(page * pageSize)
      .limit(pageSize)
    console.log('data', data)
    successResponse(res, data)
  } catch (error) {
    errorResponse(res, error)
  }
}

module.exports = {
  insetMessages,
  getRecentMessages
}
