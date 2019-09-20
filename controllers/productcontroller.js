var Product = require('../models/product');
var mongoose = require('mongoose');

module.exports = class ProductController{
    saveProduct(req,res,next) { 
        let newProduct = new Product({
            productName : req.body.productName,
            unitPrice : req.body.unitPrice,
            unitInStock :req.body.unitInStock,
            discontinued : req.body.discontinued,
            categoryInfo : mongoose.mongo.ObjectId(req.body.categoryInfo) 
        });
        newProduct.save()
        .then(() => {
            return res.status(201).send({
                responseCode : "00",
                message : "Product saved sucessfully"
            })
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).send({
                responseCode : "10",
                message : "Product was not sucessfuly saved"
            })
        })     
    }
    getProducts(req,res,next){
        Product.find()
        .then((result) => {
            console.log(result)
            return res.status(200).send({
                responseCode : "00",
                products : result
            });
        })
        .catch((err) => {
            console.log(err)
            return res.status(200).send({
                responseCode : "10",
                "products" : []
            });
        })
    }
    getProductById(req,res,next){
        Product.findById(req.params.id)
        .then((result) => {
            console.log(result)
            if(result){
                return res.status(200).send({
                    responseCode : "00",
                    products : result
                });
            }
            return res.status(200).send({
                responseCode : "10",
                products : []
            });
        })
        .catch((err) => {
            console.log(err)
            return res.status(200).send({
                responseCode : "10",
                "products" : []
            });
        })
    }
    deleteProduct(req,res,next){
        Product.findByIdAndRemove(req.params.id)
        .then((removedDoc) => {
            console.log(removedDoc)
            if (removedDoc === null){
                return res.status(200).send({
                    responseCode : "00",
                    message : "Product not found"
                });
            }
            return res.status(200).send({
                responseCode : "00",
                message : "Product Removed successfully"
            });
        })
        .catch((err) => {
            console.log(err)
            return res.status(200).send({
                responseCode : "10",
                message : "Error occured removing product"
            });
        })
    }
}