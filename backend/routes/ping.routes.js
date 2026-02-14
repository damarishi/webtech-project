const express = require('express');
const router = express.Router();
const isAuth = require('../services/isAuth');
//controller
const pingCtrl = require('../controllers/ping.controller');

router.get('/', pingCtrl.ping);


module.exports = router;