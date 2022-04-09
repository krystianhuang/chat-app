const { ERROR_MSG } = require('../constants/constants')
const Message = require('../services/message')
const { successResponse, errorResponse } = require('../utils/util')
const redis = require('../modules/redis')
const { toMongoId } = require('../utils/mongoose')

const createTempMessages = async (req, res) => {
  if (!req.body.message) {
    errorResponse(res)
    return
  }
  const messages = (await redis.getValue('tempMessages')) || []
  await redis.setValue('tempMessages', [
    ...messages,
    {
      ...req.body.message,
      createTime: Math.round(+new Date().getTime() / 1000)
    }
  ])
  successResponse(res, true)
}

const getTempMessages = async (req, res) => {
  const { roomId } = req.query

  const messages = (await redis.getValue('tempMessages')) || []
  successResponse(
    res,
    messages.filter(v => v.roomId === roomId)
  )
}

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
    // .skip(page * pageSize)
    // .limit(pageSize)
    console.log('getRecentMessages', data)
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

const getMessagesCount = async (req, res) => {
  const { list, status } = req.body

  const countObject = {}

  for (let index = 0; index < list.length; index++) {
    const message = list[index]
    console.log('message', message)
    const result = await Message.getCount({
      roomId: message.roomId,
      senderId: message.senderId,
      status: status
    })
    countObject[message.roomId] = result
  }

  successResponse(res, countObject)
}

const updateMessagesStatus = async (req, res) => {
  const { roomId, status } = req.body
  const result = await Message.update({ roomId, status })
  successResponse(res, result)
}

module.exports = {
  createTempMessages,
  getTempMessages,
  insetMessages,
  getRecentMessages,
  deleteMessage,
  getMessagesCount,
  updateMessagesStatus
}
