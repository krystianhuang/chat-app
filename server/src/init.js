const mongoose = require('mongoose')
const { DB_CONFIG } = require('./config/db')
const SystemUser = require('./models/systemUser')
mongoose.connect(DB_CONFIG.url)

const initSystemUsers = () => {
  SystemUser.insertMany([{ username: 'systemUser1', status: 0 }])
  console.log('System user init successful')
}

initSystemUsers()
