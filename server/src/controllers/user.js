const { errorResponse, successResponse } = require('../utils/util')
const {
  SUCCESS_MSG,
  ERROR_MSG,
  USER_STATUS
} = require('../constants/constants')
const UserServices = require('../services/user')
const ReportServices = require('../services/report')

const { createToken, parseToken } = require('../utils/auth')
const { onlineUserList } = require('../modules/socket')
const getVerificationCode = require('../utils/verCode')
const sendVerificationCode = require('../utils/nodemailer')

const login = async (req, res) => {
  console.log('session', req.session)

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

  if (user.status === USER_STATUS.DISABLED) {
    errorResponse(res, ERROR_MSG.DISABLED)
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

const findUsers = async (req, res) => {
  try {
    const { username } = req.query
    const query = {}
    if (username) {
      const regex = new RegExp(username, 'i')
      query.username = { $regex: regex }
    }

    const friends = await UserServices.get(query)
    successResponse(res, friends)
  } catch (error) {
    console.log('error', error)
    errorResponse(res)
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

const reportUser = async (req, res) => {
  try {
    await ReportServices.create(req.body.reportInfo)
    successResponse(res, true)
  } catch (error) {
    errorResponse(res)
  }
}

const getReportedList = async (req, res) => {
  try {
    const result = await ReportServices.getAll()
    successResponse(res, result)
  } catch (error) {
    console.log('error', error)
    errorResponse(res)
  }
}

const disableUser = async (req, res) => {
  try {
    const { user } = req.body
    await UserServices.update({ userId: user.userId, status: 1 })
    await ReportServices.remove({ _id: user._id })
    successResponse(res, true)
  } catch (error) {
    errorResponse(res)
  }
}

const noPassReport = async (req, res) => {
  try {
    const { user } = req.body
    await ReportServices.remove({ _id: user._id })
    successResponse(res, true)
  } catch (error) {
    errorResponse(res)
  }
}

const getVerCode = async (req, res) => {
  try {
    const codeOption = getVerificationCode()
    await sendVerificationCode(req.body.email, codeOption.code)
    req.session.codeOption = codeOption

    successResponse(res, true)
  } catch (error) {}
}

const resetPassword = async (req, res) => {
  const { email, code, password } = req.body
  const { codeOption = {} } = req.session
  if (code !== codeOption.code) {
    return errorResponse(res, 'Verification code is error')
  }

  try {
    const user = await UserServices.getOne({ email })
    if (!user) {
      return errorResponse(res)
    }
    const newUser = await UserServices.update({ userId: user._id, password })
    successResponse(res, newUser)
  } catch (error) {
    console.log('error', error)
    errorResponse(res)
  }
}

module.exports = {
  login,
  save,
  getOnlineUsers,
  getUserInfo,
  updateUserInfo,
  findUsers,
  reportUser,
  getReportedList,
  disableUser,
  noPassReport,
  getVerCode,
  resetPassword
}
