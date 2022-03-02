const redis = require('../modules/redis')
const { isObject, errorResponse, successResponse } = require('../utils/util')

const addConversation = async (req, res) => {
  try {
    const params = req.body
    if (!isObject(params)) {
      errorResponse()
      return
    }
    let conversationMap = (await redis.getValue('conversationMap')) || {}
    const nowTime = Math.round(new Date().getTime() / 1000)
    if (conversationMap[params.senderId]) {
      // if have not record
      if (
        !conversationMap[params.senderId].find(
          v => v.receiverId === params.receiverId
        )
      ) {
        conversationMap[params.senderId] = [
          ...conversationMap[params.senderId],
          { ...params, createTime: nowTime }
        ]
      }
    } else {
      conversationMap[params.senderId] = [{ ...params, createTime: nowTime }]
    }
    redis.setValue('conversationMap', conversationMap)
    successResponse(res, conversationMap[params.senderId])
  } catch (error) {
    console.log('error', error)
  }
}

const getChatList = async (req, res) => {
  const { userId } = req.query
  if (!userId) return errorResponse(res)
  const conversationMap = (await redis.getValue('conversationMap')) || {}
  return successResponse(res, conversationMap[userId] || [])
}

const deleteConversation = async (req, res) => {
  const { senderId, receiverId } = req.query
  if (!receiverId) return errorResponse(res)
  const conversationMap = (await redis.getValue('conversationMap')) || {}
  let list = conversationMap[senderId]
  list = list.filter(v => v.receiverId !== receiverId)
  conversationMap[senderId] = list

  console.log('list', list, senderId, receiverId)

  redis.setValue('conversationMap', conversationMap)
  return successResponse(res, list)
}

module.exports = {
  addConversation,
  deleteConversation,
  getChatList
}
