const { errorResponse, successResponse } = require('../utils/util')
const SystemUser = require('../models/systemUser')

const getSystemUsers = async (_, res) => {
  try {
    const users = await SystemUser.find()
    successResponse(res, users)
  } catch (error) {
    errorResponse(res)
  }
}

module.exports = {
  getSystemUsers
}
