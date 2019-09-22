//Define App Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

//Define API Routes
var productroute = require('./routes/product-route');
var categoryroute = require('./routes/category-route');
var orderroute = require('./routes/order-route');

//Initialize App Dependencies
var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

//Initialize API Routes
app.use('/api/product',productroute);
app.use('/api/category',categoryroute);
app.use('/api/order',orderroute);


//Set Header Response 
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
    next();
})

//Catch Internal Server Error
app.use((err,req,res,next) => {
    if(err){
        console.log(res.status(500));
    }
})

module.exports = app;
