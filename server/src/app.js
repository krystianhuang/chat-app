import express from 'express'
import mongoose from 'mongoose'
import routes from './routes'
import { DB_CONFIG } from './config/db'
import { PORT } from './constants/constants'

const app = express()
mongoose.connect(DB_CONFIG.url)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
routes(app)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost/${PORT}`)
})

export default app
