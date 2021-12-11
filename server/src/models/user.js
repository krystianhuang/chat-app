const Monggose = require('mongoose')

const Userschema = new Monggose.Schema({
  username: {
    type: String,
    required: 'Username is a required field'
  },
  email: {
    type: String
  },
  password: {
    type: String,
    required: 'Password is a required feild'
  },
  avatar: {
    type: String
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  updateDate: {
    type: Date,
    default: Date.now
  }
})

const User = Monggose.model('User', Userschema)

module.exports = User
