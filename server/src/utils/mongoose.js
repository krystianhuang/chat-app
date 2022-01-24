const Mongoose = require('mongoose')

const toMongoId = id => {
  return Mongoose.Types.ObjectId(id)
}

const objectIdToId = id => {
  return Mongoose.Types.ObjectId(id).toString()
}

module.exports = {
  toMongoId,
  objectIdToId
}
