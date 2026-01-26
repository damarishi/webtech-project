const express = require('express');
const router = express.Router();
const isAuth = require('../services/isAuth');
//controller
const discountCtrl = require('../controllers/discount.controller');

router.get('/', discountCtrl.getAll);
router.post('/', discountCtrl.createDiscount);
router.put('/:id', discountCtrl.editDiscount);
router.delete('/:id', discountCtrl.deleteDiscount);
router.post('/validate', isAuth, discountCtrl.validate);


module.exports = router;