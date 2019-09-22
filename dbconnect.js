var mongoose = require('mongoose');

module.exports = function connect(){
    return mongoose.connect("mongodb://localhost:27017,localhost:27018,localhost:27019/northwind?replicaSet=rs0")
}
