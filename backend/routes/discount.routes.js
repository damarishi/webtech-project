const express = require('express');
const router = express.Router();
//controller
const discountCtrl = require('../controllers/discount.controller');

router.get('/', discountCtrl.getAll);
router.post('/', discountCtrl.createDiscount);
router.put('/:id', discountCtrl.editDiscount);
router.delete('/:id', discountCtrl.deleteDiscount);


module.exports = router;