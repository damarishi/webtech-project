const express = require('express');
const router = express.Router();
//controller
const userModerationCtrl = require('../controllers/user_moderation');

router.get('/', userModerationCtrl.getAll);

module.exports = router;



