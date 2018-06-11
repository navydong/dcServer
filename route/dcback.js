var express = require('express')
var router = express.Router()

var productController = require('../controller/productController')
var categoryController = require('../controller/categoryController')

router.get('/productController/page', productController.retrieve)
router.post('/productController/add', productController.create)
router.delete('/productController/delete/:id', productController.delete)
router.post('/productController/update', productController.update)


router.get('/categoryController/pullDownCatg', categoryController.retrieve)
module.exports = router