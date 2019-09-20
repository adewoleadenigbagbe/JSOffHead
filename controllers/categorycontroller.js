var Category = require('../models/category');

module.exports = class CategoryController {
    saveCategory(req,res,next){
        let newCategory = new Category({
            categoryName : req.body.categoryName,
            description : req.body.description
        });

        newCategory.save()
        .then(() => {
            return res.status(201).send({
                responseCode : "00",
                message : "Category saved sucessfully"
            })
        })
        .catch((err) => {
            console.log(err)
            return res.status(200).send({
                responseCode : "10",
                message : "Category was not sucessfuly saved"
            })
        })
    }
    getCatgoryById(req,res,next){
        Category.findById(req.params.id)
        .then((category) => {
            return res.status(200).send({
                responseCode : "00",
                category : category
            })
        })
        .catch((err) => {
            console.log(err)
            return res.status(200).send({
                responseCode : "10",
                category : {}
            })
        })
    }
}