const jwt = require('jsonwebtoken')

const { TOKEN_SECRET } = require('../config')

const createToken = str => {
  return jwt.sign({ str }, TOKEN_SECRET)
}

const parseToken = token => {
  const userId = jwt.verify(token, TOKEN_SECRET).str
  return userId
}

module.exports = {
  createToken,
  parseToken
}
