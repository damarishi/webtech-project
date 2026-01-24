const express = require("express");
const router = express.Router();


//controller
const orderCtrl = require('../controllers/orders.controller');


router.get('/', orderCtrl.getAll);


module.exports = router;