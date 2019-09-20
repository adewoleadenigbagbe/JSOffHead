var mongoose = require('mongoose');
var customerSchema = mongoose.Schema({
    contactName : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("customer",customerSchema)