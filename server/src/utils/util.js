const successResponse = (res, data, msg = '') => {
  res.send({
    code: 0,
    data,
    msg
  })
}

const errorResponse = (res, msg = 'FAILED', code = 1) => {
  res.send({
    code: 1,
    data: null,
    msg
  })
}

const isObject = v => {
  return Object.prototype.toString.call(v) === '[object Object]'
}

module.exports = {
  successResponse,
  errorResponse,
  isObject
}
