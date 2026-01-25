const express = require("express");
const router = express.Router();
const isAuth = require("../services/isAuth");


//controller
const orderCtrl = require('../controllers/orders.controller');


router.get('/', orderCtrl.getAll);
router.post('/', isAuth, orderCtrl.createOrder);

module.exports = router;