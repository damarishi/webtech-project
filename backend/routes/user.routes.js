const express = require('express');
const router = express.Router();
const isAuth = require('../services/isAuth');
//controller
const userCtrl = require('../controllers/user.controller');

router.get('/', userCtrl.getAll);
router.post('/', userCtrl.create);
router.put('/:id', userCtrl.markAsDeleted);
router.delete('/:id', userCtrl.delete);     //hard delete, never used

router.get('/me', isAuth, userCtrl.getMe);
router.patch('/me', isAuth, userCtrl.updateMe);

module.exports = router;