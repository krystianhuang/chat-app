const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '../imgs'))
  },
  filename: (req, file, callback) => {
    const names = file.originalname.split('.')
    callback(null, `${file.fieldname}-${Date.now()}.${names[names.length - 1]}`)
  }
})

const upload = multer({
  storage
})

module.exports = upload
