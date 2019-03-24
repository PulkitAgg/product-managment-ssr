const express = require('express');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var reactRoutes = require('./routes/reactRoutes');
var productRoutes = require('./routes/productRoutes');

// Connect to the MongoDB
mongoose.connect('mongodb://localhost:27017/productManagment');


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    res.header('Access-Control-Expose-Headers', 'authorization');
    if (req.method === 'OPTIONS') {
        res.end();
    }
    else {
        next();
    }
});

app.use('/', reactRoutes);
app.use('/api', productRoutes);

app.listen(3000, () => {
    console.log('Server listen on 3000 port')
})