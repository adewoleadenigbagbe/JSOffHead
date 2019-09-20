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

//Connect the MongoDB
mongoose.connect("mongodb://localhost:27017/northwind?replicaSet=rs0")
.then(result => {
    console.log("Sucessfully connected to the database " +result)
})
.catch(err => {
    console.log("Failed connecting to the database" + err)
});

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

//Set App to listen on defined port
let port = process.env.Port || 6007
app.listen(port,() => {
    console.log(`jsoff-head running on port ${port}`);
})



