const PORT = 3001

const ERROR_MSG = {
  USER_DOSE_NOT_EXIST: 'User dose not exist',
  USER_NEME_EXISTED: 'USER_NEME_EXISTED',
  PASSWORD_ERROR: 'PASSWORD_ERROR',
  CAN_NOT_ADD_YOURSELF: 'Can not add yourself',
  HAVE_ALREADY_ADDED_THIS_FRIEND: 'You have already added this friend',
  LOGIN_EXPIRED: 'LOGIN_EXPIRED',
  USER_IS_NOT_LOGIN: 'USER_IS_NOT_LOGIN',
  PARAMS_ERROR: 'PARAMS_ERROR'
}

const SUCCESS_MSG = {
  REGISTER_SUCCESSFUL: 'REGISTER_SUCCESSFUL',
  LOGIN_SUCCESSFUL: 'LOGIN_SUCCESSFUL',
  ADD_SUCCESSFUL: 'ADD_SUCCESSFUL'
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
