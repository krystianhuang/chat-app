const express = require('express')
const userRouter = require('./user')
const friendRouter = require('./friend')
const messageRouter = require('./message')
const uploadRouter = require('./upload')
const validateMessagesRouter = require('./validateMessages')
const systemRouter = require('./system')

const registeRroutes = app => {
  const router = express.Router()
  app.use(router)
  app.use('/api/user', userRouter)
  app.use('/api/friend', friendRouter)
  app.use('/api/message', messageRouter)
  app.use('/api/upload', uploadRouter)
  app.use('/api/validateMessages', validateMessagesRouter)
  app.use('/api/system', systemRouter)
}

module.exports = registeRroutes
