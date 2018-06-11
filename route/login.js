var express = require('express')
var loginController = require('../controller/loginController')
var router = express.Router()
router.get('/', loginController.retrieve)
module.exports = router