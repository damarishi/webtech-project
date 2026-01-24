const express = require("express");
const router = express.Router();
const isAuth = require("../services/isAuth");

//controller
const restaurantCtrl = require('../controllers/restaurant.controller');

router.get('/', isAuth, restaurantCtrl.getRestaurantsWithDistance);
//router.get('/', restaurantCtrl.getAll);
router.get('/:id/menu', restaurantCtrl.getMenu);
router.get('/:id', restaurantCtrl.getItem);


module.exports = router;