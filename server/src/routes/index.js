const express = require('express')
const systemRouter = require('./system')
const userRouter = require('./user')
const friendRouter = require('./friend')
const messageRouter = require('./message')
const uploadRouter = require('./upload')
const validateMessagesRouter = require('./validateMessages')
const chatRouter = require('./chat')

const registeRroutes = app => {
  const router = express.Router()
  app.use(router)
  app.use('/api/system', systemRouter)
  app.use('/api/user', userRouter)
  app.use('/api/friend', friendRouter)
  app.use('/api/message', messageRouter)
  app.use('/api/upload', uploadRouter)
  app.use('/api/validateMessages', validateMessagesRouter)
  app.use('/api/chat', chatRouter)
}

module.exports = registeRroutes
