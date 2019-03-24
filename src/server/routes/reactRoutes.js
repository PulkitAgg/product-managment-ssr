
var express = require('express');
var router = express.Router();
var reactController = require('../controllers/reactController');

router.route('/')
    .get(reactController.servePages);

router.route('/add-product')
    .get(reactController.servePages);

//export the router
module.exports = router;