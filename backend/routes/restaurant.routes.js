const express = require("express");
const router = express.Router();


//controller
const restaurantCtrl = require('../controllers/restaurant.controller');


router.get('/', restaurantCtrl.getAll);

module.exports = router;