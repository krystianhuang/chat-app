const express = require('express')
const { SERVER_URL } = require('../config')
const router = express.Router()
const upload = require('../modules/uploadfile')
const { successResponse } = require('../utils/util')

router.post('/file', upload.single('file'), (req, res) => {
  successResponse(res, { url: `${SERVER_URL}/imgs/` + req.file.filename })
})

module.exports = router
