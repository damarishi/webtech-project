const express = require("express");
const router = express.Router();


//controller
const restaurantCtrl = require('../controllers/restaurant.controller');


router.get('/', restaurantCtrl.getAll);
router.get('/:id', restaurantCtrl.getItem);
router.get('/:id/menu', restaurantCtrl.getMenu);

module.exports = router;