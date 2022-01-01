const Monggose = require('mongoose')

const SystemUserSchema = new Monggose.Schema({
  username: {
    type: String,
    required: 'Username is a required field'
  },
  status: {
    type: Number
  }
})

const SystemUser = Monggose.model('SystemUser', SystemUserSchema)

module.exports = SystemUser
