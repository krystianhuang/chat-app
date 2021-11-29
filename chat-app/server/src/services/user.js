const User = require('../models/user')

const get = (key, value) => {
  const res = User.findOne({ [key]: value })
  return res
}

const create = user => {
  const newUser = new User(user)

  return newUser.save()
}

module.exports = { get, create }
