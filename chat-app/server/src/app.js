const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./routes')
const { DB_CONFIG } = require('./config/db')
const { PORT } = require('./constants/constants')

const app = express()
mongoose.connect(DB_CONFIG.url)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

routes(app)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost/${PORT}`)
})
