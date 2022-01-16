const redis = require('../modules/redis')
const { isObject, errorResponse, successResponse } = require('../utils/util')

const addConversation = async (req, res) => {
  try {
    const params = req.body
    if (!isObject(params)) {
      errorResponse()
      return
    }
    let chatList = (await redis.getValue('chatList')) || []
    const record = chatList.find(v => v.roomId === params.roomId)
    const nowTime = Math.round(new Date().getTime() / 1000)
    if (record) {
      record.createTime = nowTime
    } else {
      chatList = [...chatList, { ...params, createTime: nowTime }]
    }
    redis.setValue('chatList', chatList)
    successResponse(res, chatList)
  } catch (error) {
    console.log('error', error)
  }
}

const getChatList = async (req, res) => {
  const { userId } = req.query
  if (!userId) return errorResponse(res)
  const chatList = (await redis.getValue('chatList')) || []
  return successResponse(
    res,
    chatList.filter(v => v.senderId === userId)
  )
}

const deleteConversation = async (req, res) => {
  const { receiverId } = req.query
  if (!receiverId) return errorResponse(res)
  let chatList = (await redis.getValue('chatList')) || []
  chatList = chatList.filter(v => v.receiverId !== receiverId)
  redis.setValue('chatList', chatList)
  return successResponse(res, chatList)
}

module.exports = {
  addConversation,
  deleteConversation,
  getChatList
}
