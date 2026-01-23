const express = require('express');
const router = express.Router();
//controller
const settingsCtrl = require('../controllers/platform_settings.controller');

router.get('/', settingsCtrl.getAll);
router.post('/', settingsCtrl.create);
router.put('/:id', settingsCtrl.update);
router.delete('/:id', settingsCtrl.delete);


module.exports = router;
