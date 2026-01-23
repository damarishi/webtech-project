const express = require('express');
const router = express.Router();
//controller
const userModerationCtrl = require('../controllers/user_moderation');

router.get('/', userModerationCtrl.getAll);
router.patch('/warn/:id', userModerationCtrl.warnUser);
router.patch('/suspend/:id', userModerationCtrl.suspendUser);

module.exports = router;



