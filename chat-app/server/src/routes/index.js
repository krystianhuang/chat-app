const userRouter = require('./user')
const express = require('express')

const registeRroutes = app => {
  const router = express.Router()
  app.use(router)
  app.use('/api', userRouter)
}

module.exports = registeRroutes
