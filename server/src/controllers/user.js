const { errorResponse, successResponse } = require('../utils/util')
const { SUCCESS_MSG, ERROR_MSG } = require('../constants/constants')
const UserServices = require('../services/user')
const { createToken, parseToken } = require('../utils/auth')
const { onlineUserList } = require('../modules/socket')

const login = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    errorResponse(res)
    return
  }

  const { username, password } = req.body
  const user = await UserServices.getOne({ username: username })
  if (!user) {
    errorResponse(res, ERROR_MSG.USER_DOSE_NOT_EXIST)
    return
  }
  if (user.password !== password) {
    errorResponse(res, ERROR_MSG.PASSWORD_ERROR)

    return
  }
  const token = createToken(user._id)
  successResponse(res, { ...user._doc, token }, SUCCESS_MSG.LOGIN_SUCCESSFUL)
}

const save = async (req, res) => {
  const user = req.body
  try {
    const hasUser = await UserServices.getOne({ username: user.username })
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

const getUserInfo = async (req, res) => {
  try {
    const user = await UserServices.getOne({ _id: req.params.id })
    if (user) {
      return successResponse(res, user)
    }
    errorResponse(res, {})
  } catch (error) {
    errorResponse(res, {})
  }
}

const updateUserInfo = async (req, res) => {
  try {
    const { userId } = req.body
    if (parseToken(req.headers.authorization) !== userId) {
      return errorResponse(res, ERROR_MSG.NO_PERMISSION)
    }

    const user = await UserServices.update(req.body)
    if (user) {
      return successResponse(res, user)
    }
    errorResponse(res)
  } catch (error) {
    console.log('error', error)
    errorResponse(res)
  }
}

const getOnlineUsers = (_, res) => {
  successResponse(res, onlineUserList)
}

module.exports = { login, save, getOnlineUsers, getUserInfo, updateUserInfo }
