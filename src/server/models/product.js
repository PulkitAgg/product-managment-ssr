var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Product = new Schema({
    name: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    }
}, {
        timestamps: true,
        collection: 'Product'
    });

module.exports = mongoose.model('Product', Product);