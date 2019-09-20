var mongoose = require('mongoose');
var orderSchema = mongoose.Schema({
    orderDate : {
        type : Date,
        required : true
    },
    shippedDate : {
        type : Date,
        required : true
    },
    shipName : {
        type : String,
        required : true
    },
    shipAddress : {
        type : String,
        required : true
    },
    orderDetails : [
        {
            unitPrice : {
                type : mongoose.Schema.Types.Decimal128,
                required : true
            },
            quantity : {
                type : Number,
                required : true
            },
            discount : {
                type : mongoose.Schema.Types.Decimal128,
                required : true
            },
            productInfo : {
                type : mongoose.Schema.Types.ObjectId,
                required : true,
                ref : 'product'
            }
        }
    ],
    employeeInfo : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'employee'
    },
    customerInfo : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'customer'
    }
})

module.exports = mongoose.model('order',orderSchema);