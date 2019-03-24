var Product = require('../models/product');

exports.addProduct= function (req, res, next) {
    var product = new Product(req.body);
    product.save().then(pro => {
        res.statusCode = 200;
        res.json({
            success: true,
            data: 'Data added scuccessfully',
            res: pro
        })
    }).catch(err => next(err));
}

exports.editProduct= function (req, res, next) {
    let updateVal = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    }
    Product.findByIdAndUpdate(req.body.id,updateVal).then(updatedpro => {
        res.statusCode = 200;
        res.json({
            success: true,
            data: 'Data updated scuccessfully',
            res: updatedpro
        })
    }).catch(err => next(err));
}

exports.getProduct = function(req,res,next) {
    Product.find({}).then(data => {
        res.json({
            success: true,
            data:data
        })
    }).catch(err => next(err));
}