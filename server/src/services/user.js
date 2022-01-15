const User = require('../models/user')

const get = user => {
  const res = User.findOne(user)
  return res
}

const create = user => {
  const newUser = new User(user)

  return newUser.save()
}

const update = user => {
  const res = User.findByIdAndUpdate({ _id: user.userId }, user)
  return res
}

module.exports = { get, create, update }
