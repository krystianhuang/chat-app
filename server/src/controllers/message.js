const Message = require('../services/message')
const { successResponse, errorResponse } = require('../utils/util')
const { model } = require('mongoose')

const insetMessages = async messages => {
  const [data] = await Message.createMany(messages)
  return data
}

const getRecentMessages = async (req, res) => {
  const { roomId } = req.query
  const page = Number(req.query.page)
  const pageSize = Number(req.query.pageSize)

  try {
    const data = await Message.get({ roomId })
      .sort({ _id: -1 })
      .skip(page * pageSize)
      .limit(pageSize)
    successResponse(res, data)
  } catch (error) {
    errorResponse(res, error)
  }
}

module.exports = {
  insetMessages,
  getRecentMessages
}
