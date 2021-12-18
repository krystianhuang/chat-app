const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')
const { DB_CONFIG } = require('./config/db')
const { PORT } = require('./constants/constants')
const createSocket = require('./modules/socket')
const path = require('path')
const useMiddleware = require('./middleware')

const app = express()
app.use(cors())
const http = require('http').createServer(app)
mongoose.connect(DB_CONFIG.url)

createSocket(http)

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/imgs', express.static(path.join(__dirname, 'imgs')))

useMiddleware(app)
routes(app)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost/${PORT}`)
})
