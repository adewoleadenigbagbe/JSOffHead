const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/ordercontroller');


var orderController = new OrderController();

router.post('/',orderController.saveOrder);
router.get('/',orderController.getAllOrders);
module.exports = router;