const { errorResponse, successResponse } = require('../utils/util')
const { SUCCESS_MSG, ERROR_MSG } = require('../constants/constants')
const ValidateMessages = require('../services/validateMessages')

const insertValidateMessage = async message => {
  ValidateMessages.create(message)
}

const getValidateNews = async (req, res) => {
  try {
    const { id, status } = req.query
    if (!id) {
      return errorResponse(res)
    }
    const data = await ValidateMessages.get({
      receiverId: id,
      status: status ? Number(status) : 2
    })
    successResponse(res, data)
  } catch (error) {
    errorResponse(res)
  }
}

const updateMessagesStatus = async params => {
  const data = await ValidateMessages.update({
    ...params
  })
  console.log('data', data)
}

module.exports = {
  insertValidateMessage,
  getValidateNews,
  updateMessagesStatus
}
