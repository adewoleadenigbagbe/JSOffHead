const express = require('express');
const CategoryController = require('../controllers/categorycontroller');

const router = express.Router();
const categorycontroller = new CategoryController();

router.post('/',categorycontroller.saveCategory);
router.get('/:id',categorycontroller.getCatgoryById);

module.exports = router;
