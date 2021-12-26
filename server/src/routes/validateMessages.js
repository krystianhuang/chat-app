const express = require('express')
const router = express.Router()
const ValidateMessagesController = require('../controllers/validateMessages')

router.get('/list', ValidateMessagesController.getValidateNews)

module.exports = router
