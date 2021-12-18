const { TOKEN_SECRET } = require('../config')
const { ERROR_MSG, WHITE_ROUTES } = require('../constants/constants')
const { errorResponse } = require('../utils/util')
const jwt = require('jsonwebtoken')

const checkIsLogin = (req, res, next) => {
  try {
    const token = req.headers.authorization
    const origin = req.originalUrl
    if (WHITE_ROUTES.includes(origin)) {
      next()
      return
    }
    if (token) {
      const userId = jwt.verify(token, TOKEN_SECRET).str
      if (!userId) {
        return errorResponse(res, ERROR_MSG.LOGIN_EXPIRED)
      }
      next()
    } else {
      return errorResponse(res, ERROR_MSG.USER_IS_NOT_LOGIN)
    }
  } catch (error) {
    return errorResponse(res, ERROR_MSG.LOGIN_EXPIRED)
  }
}

module.exports = checkIsLogin
