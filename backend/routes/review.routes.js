const express = require('express');
const router = express.Router();
const reviewCtrl = require('../controllers/review.controller');
const isAuth = require('../services/isAuth');

router.get('/restaurant/:restaurantId', isAuth, reviewCtrl.getByRestaurant);
router.post('/', isAuth, reviewCtrl.create);

module.exports = router;
