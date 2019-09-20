const ProductController = require('../controllers/productcontroller');
const express = require('express');
const router = express.Router();

var productController = new ProductController();
router.post('/',productController.saveProduct);
router.get('/',productController.getProducts)
router.get('/:id',productController.getProductById)
router.delete('/:id',productController.deleteProduct)


module.exports = router;