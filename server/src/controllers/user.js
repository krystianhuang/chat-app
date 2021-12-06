const { errorResponse, successResponse } = require('../utils/util')
const { SUCCESS_MSG, ERROR_MSG } = require('../constants/constants')
const UserServices = require('../services/user')

const login = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    errorResponse(res)
    return
  }

  const { username, password } = req.body
  const user = await UserServices.get('username', username)
  if (!user) {
    errorResponse(res, ERROR_MSG.USER_DOSE_NOT_EXIST)
    return
  }
  if (user.password === password) {
    successResponse(res, SUCCESS_MSG.LOGIN_SUCCESSFUL)
    return
  }
  errorResponse(res, ERROR_MSG.PASSWORD_ERROR)
}

const save = async (req, res) => {
  const user = req.body
  console.log('user', user)
  try {
    const hasUser = await UserServices.get('username', user.username)
    console.log('hasUser', hasUser)
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

module.exports = { login, save }