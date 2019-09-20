const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/ordercontroller');

var orderController = new OrderController();

router.post('/',orderController.saveOrder);
module.exports = router;