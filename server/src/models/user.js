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
  avatar: String,
  hobby: String,
  sex: {
    type: Number, // 0 : man , 1 : woman, 2: unknown
    default: 2
  },
  birthday: Number,
  description: String,
  /**
   * 0: user , 1: admin
   */
  role: {
    type: Number,
    default: 0
  },
  /**
   * 0: noraml , 1: disabled
   */
  status: {
    type: Number,
    default: 0
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
