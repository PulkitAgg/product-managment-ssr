
var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController');

router.route('/product-list')
    .get(productController.getProduct);

router.route('/add-product')
    .post(productController.addProduct);

router.route('/edit-product')
    .post(productController.editProduct);

module.exports = router;