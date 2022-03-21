const Report = require('../models/report')

const getAll = () => {
  const res = Report.find()
  return res
}

const create = v => {
  const res = Report.create(v)
  return res
}

const update = data => {
  const { _id, status } = data
  const res = ValidateMessages.updateOne(
    { _id },
    {
      $set: {
        status
      }
    }
  )
  return res
}

const remove = data => {
  const res = Report.deleteMany(data)
  return res
}

module.exports = { getAll, create, update, remove }
