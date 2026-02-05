const express = require("express");
const router = express.Router();
const isAuth = require('../services/isAuth');

const loyaltyCtrl = require('../controllers/loyalty.controller');

router.get('/', isAuth, loyaltyCtrl.getLoyaltyDiscount);
router.get('/progress', isAuth, loyaltyCtrl.getProgress);

module.exports = router;