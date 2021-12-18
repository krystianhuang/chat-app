const checkIsLogin = require('./isLogin')

const useMiddleware = app => {
  app.use(checkIsLogin)
}

module.exports = useMiddleware
