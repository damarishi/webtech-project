const express = require("express");
const router = express.Router();
const isAuth = require("../services/isAuth");


//controller
const orderCtrl = require('../controllers/orders.controller');


router.get('/', isAuth, orderCtrl.getAll);
router.post('/', isAuth, orderCtrl.createOrder);
router.get('/me', isAuth, orderCtrl.getMyOrders);

module.exports = router;