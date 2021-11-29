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

module.exports = {
  successResponse,
  errorResponse
}
