const Mongoose = require('mongoose')

const toMongoId = id => {
  return Mongoose.Types.ObjectId(id)
}

module.exports = {
  toMongoId
}
