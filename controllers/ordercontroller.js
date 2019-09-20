const mongoose = require('mongoose');
const Order = require('../models/order');
const Customer = require('../models/customer')
const Employee = require('../models/employee')

module.exports = class OrderController {
    async saveOrder(req,res,next){
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            let newcustomer = new Customer({
                contactName : req.body.customer.contactName,
                address : req.body.customer.address,
                city : req.body.customer.city
            });           
            let result = await newcustomer.save();
            console.log("This is the result saved of customer " +result);
            
            let employee = new Employee({
                contactName : req.body.employee.contactName,
                address : req.body.employee.address,
                city : req.body.employee.city
            });           
            let result2 = await employee.save();
            console.log("This is the result saved of employee " +result2);

            let order = new Order({
                orderDate : req.body.orderDate,
                shippedDate : req.body.shippedDate,
                shipName : req.body.shipName,
                shipAddress : req.body.shipAddress,
                orderDetails : req.body.orderDetails,
                employeeInfo : result._id,
                customerInfo : result2._id
            });
            await order.save();
            let result3 = await order.save();
            console.log("This is the result saved of order " +result3);

            await session.commitTransaction();
        }catch (error) {
            console.log(error);
            await session.abortTransaction();
        }
        finally{
            session.endSession();
            return res.status(201).send({
                "message" : "compelted"
            })
        }
    }

}