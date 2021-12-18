const express = require('express')
const router = express.Router()
const upload = require('../modules/uploadfile')
const { successResponse } = require('../utils/util')

router.post('/file', upload.single('file'), (req, res) => {
  console.log('file', req.file)
  successResponse(res, { url: '/imgs/' + req.file.filename })
})

module.exports = router
