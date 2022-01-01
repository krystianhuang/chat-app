const { errorResponse, successResponse } = require('../utils/util')
const { SUCCESS_MSG, ERROR_MSG } = require('../constants/constants')
const ValidateMessages = require('../services/validateMessages')

const insertValidateMessage = async message => {
  ValidateMessages.create(message)
}

const getValidateNews = async (req, res) => {
  try {
    const data = await ValidateMessages.get({
      receiverId: req.query.id
    })
    console.log('req.query.id', req.query.id)
    successResponse(res, data)
  } catch (error) {
    console.log('error', error)
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
