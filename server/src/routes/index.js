const express = require('express')
const userRouter = require('./user')
const friendRouter = require('./friend')

const registeRroutes = app => {
  const router = express.Router()
  app.use(router)
  app.use('/api/user', userRouter)
  app.use('/api/friend', friendRouter)
}

module.exports = registeRroutes
