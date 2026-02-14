const express = require("express");
const router = express.Router();
const isAuth = require("../services/isAuth");

//controller
const restaurantCtrl = require('../controllers/restaurant.controller');

router.get('/', isAuth, restaurantCtrl.getRestaurantsWithDistance);
router.get('/getAll', restaurantCtrl.getAll);
router.post('/', restaurantCtrl.createRestaurant);
router.put('/:id', restaurantCtrl.editRestaurant);
router.delete('/:id', restaurantCtrl.deleteRestaurant);
router.get('/:id/menu', restaurantCtrl.getMenu);
router.get('/:id', restaurantCtrl.getRestaurant);


module.exports = router;