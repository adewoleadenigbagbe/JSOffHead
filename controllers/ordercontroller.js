const mongoose = require('mongoose');
const Order = require('../models/order');
const Customer = require('../models/customer')
const Employee = require('../models/employee')

module.exports = class OrderController {
    async saveOrder(req,res,next){
        let responseCode = "";
        let message = ""
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const opts = { session };
            let newcustomer = new Customer({
                contactName : req.body.customer.contactName,
                address : req.body.customer.address,
                city : req.body.customer.city
            });           
            let result = await newcustomer.save(opts);
            console.log("This is the result saved of customer " +result);
            
            let employee = new Employee({
                contactName : req.body.employee.contactName,
                address : req.body.employee.address,
                city : req.body.employee.city
            });           
            let result2 = await employee.save(opts);
            console.log("This is the result saved of employee " +result2);

            let order = new Order({
                orderDate : req.body.orderDate,
                shippedDate : req.body.shippedDate,
                shipName : req.body.shipName,
                shipAddress : req.body.shipAddress,
                orderDetails : req.body.orderDetails,
                customerInfo : result._id,
                employeeInfo : result2._id
            });
            let result3 = await order.save(opts);
            console.log("This is the result saved of order " +result3);

            await session.commitTransaction();

            responseCode = "00";
            message = "Order Saved.";
        }catch (error) {
            console.log(error);
            await session.abortTransaction();
            responseCode = "10";
            message = "Error occured . Order not saved.";

        }
        finally{
            session.endSession();
            return res.status(201).send({
                "responseCode" : responseCode,
                "message" : message
            })
        }
    }

    getAllOrders(req,res,next){
        Order.find()
        .populate({path:'orderDetails.productInfo', model:"product"})
        .populate({path:'employeeInfo', model:"employee"})
        .populate({path:'customerInfo', model:"customer"})
        .then((orders) => {
            if(orders.length > 0){
                return res.status(200).send({
                    responseCode : "00",
                    orders : orders,
                    message : "All Order retrieved"
                });
            }
            return res.status(200).send({
                responseCode : "00",
                orders : orders,
                message : "Orders Empty"
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(200).send({
                responseCode : "10",
                orders : [],
                message : "Error occured retrieving orders"
            });
        })
    }

}