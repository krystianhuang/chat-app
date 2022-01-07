const User = require('../models/user')

const get = user => {
  const res = User.findOne(user)
  return res
}

const create = user => {
  const newUser = new User(user)

  return newUser.save()
}

module.exports = { get, create }
