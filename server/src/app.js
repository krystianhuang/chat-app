const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')
const { DB_CONFIG } = require('./config/db')
const { PORT } = require('./constants/constants')
const { createSocket } = require('./modules/socket')
const path = require('path')
const useMiddleware = require('./middleware')
const { scheduleJob } = require('./modules/schedule')
// const Redis = require('./modules/redis')
const session = require('express-session')

const app = express()
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
  })
)

const http = require('http').createServer(app)
mongoose.connect(DB_CONFIG.url)

createSocket(http)

// const redis = new Redis()
// exports.redis = redis

app.use(
  session({
    secret: 'chat-session',
    name: 'cSession',
    resave: false
  })
)
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/imgs', express.static(path.join(__dirname, 'imgs')))

useMiddleware(app)
routes(app)
scheduleJob()

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost/${PORT}`)
})
