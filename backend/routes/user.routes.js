const express = require('express');
const router = express.Router();
//controller
const userCtrl = require('../controllers/user.controller');

router.get('/', userCtrl.getAll);
router.post('/', userCtrl.create);
router.put('/:id', userCtrl.markAsDeleted);
router.delete('/:id', userCtrl.delete);     //hard delete, never used

module.exports = router;