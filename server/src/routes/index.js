const express = require('express')
const userRouter = require('./user')
const friendRouter = require('./friend')
const messageRouter = require('./message')

const registeRroutes = app => {
  const router = express.Router()
  app.use(router)
  app.use('/api/user', userRouter)
  app.use('/api/friend', friendRouter)
  app.use('/api/message', messageRouter)
}

module.exports = registeRroutes
