const mongoose = require('mongoose')
const { DB_CONFIG } = require('./config/db')
const SystemUser = require('./models/systemUser')
const User = require('./models/user')

mongoose.connect(DB_CONFIG.url)

const initSystemUsers = () => {
  User.create({
    role: 1,
    username: 'admin',
    password: 'admin',
    avatar:
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  })
  SystemUser.insertMany([{ username: 'systemUser1', status: 0 }])
  console.log('System user init successful')
}

initSystemUsers()
