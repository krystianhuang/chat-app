const { errorResponse, successResponse } = require('../utils/util')
const { SUCCESS_MSG, ERROR_MSG } = require('../constants/constants')
const UserServices = require('../services/user')

const get = (req, res) => {
  successResponse(res)
}

const save = async (req, res) => {
  const user = req.body
  console.log('user', req.body)

  try {
    const hasUser = await UserServices.get('username', user.username)
    if (hasUser) {
      errorResponse(res, ERROR_MSG.USER_NEME_EXISTED)
      return
    }
    const createRes = await UserServices.create(user)
    successResponse(res, createRes, SUCCESS_MSG.REGISTER_SUCCESSFUL)
  } catch (error) {
    console.log('error', error)
    errorResponse(res, 'FAILED', 500)
  }
}

module.exports = { get, save }
