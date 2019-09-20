var mongoose = require('mongoose');
var productSchema = mongoose.Schema({
    productName : {
        type : String,
        required : true
    },
    unitPrice : {
        type : mongoose.Schema.Types.Decimal128,
        required : true
    },
    unitInStock : {
        type : Number,
        required : true
    },
    discontinued : {
        type : Boolean,
        required : true
    },
    categoryInfo : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'category'
    }
})

module.exports = mongoose.model("product",productSchema)