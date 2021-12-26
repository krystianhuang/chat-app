const PORT = 3001

const ERROR_MSG = {
  USER_DOSE_NOT_EXIST: '用户不存在',
  USER_NEME_EXISTED: '用户名已存在',
  PASSWORD_ERROR: '用户名或密码错误',
  CAN_NOT_ADD_YOURSELF: '自己不能添加自己',
  HAVE_ALREADY_ADDED_THIS_FRIEND: '已经添加过该好友',
  LOGIN_EXPIRED: '登录过期',
  USER_IS_NOT_LOGIN: '用户未登录',
  PARAMS_ERROR: 'PARAMS_ERROR'
}

const SUCCESS_MSG = {
  REGISTER_SUCCESSFUL: '注册成功',
  LOGIN_SUCCESSFUL: '登录成功',
  ADD_SUCCESSFUL: '添加成功'
}

const DEFAULT_MESSAGE = {
  message: '',
  messageType: 'text',
  time: Date.now()
}

/** no need to validated routes */
const WHITE_ROUTES = [
  '/api/user/login',
  '/api/user/register',
  '/api/upload/file'
]

const VALIDATE_MESSAGE_STATUS = {
  agree: 0,
  disAgree: 1
}

module.exports = {
  PORT,
  ERROR_MSG,
  SUCCESS_MSG,
  DEFAULT_MESSAGE,
  WHITE_ROUTES,
  VALIDATE_MESSAGE_STATUS
}
