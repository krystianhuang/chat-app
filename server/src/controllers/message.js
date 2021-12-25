const { ERROR_MSG } = require('../constants/constants')
const Message = require('../services/message')
const { successResponse, errorResponse } = require('../utils/util')

const insetMessages = async messages => {
  const [data] = await Message.createMany(messages)
  return data
}

const getRecentMessages = async (req, res) => {
  const { roomId } = req.query
  const page = Number(req.query.page) - 1
  const pageSize = Number(req.query.pageSize)
  try {
    const data = await Message.get({ roomId })
      .skip(page * pageSize)
      .limit(pageSize)
    successResponse(res, data)
  } catch (error) {
    errorResponse(res, error)
  }
}

const deleteMessage = async (req, res) => {
  if (!req.params.id) {
    errorResponse(res, ERROR_MSG.PARAMS_ERROR)
    return
  }

  try {
    const data = await Message.deleteOne({ _id: req.params.id })
    successResponse(res, data)
  } catch (error) {
    errorResponse(res, error)
  }
}

module.exports = {
  insetMessages,
  getRecentMessages,
  deleteMessage
}
