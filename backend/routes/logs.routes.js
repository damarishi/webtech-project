const express = require("express");
const router = express.Router();


//controller
const logsCtrl = require('../controllers/logs.controller');


router.get('/', logsCtrl.getAll);
router.post('/', logsCtrl.createLog);
router.put('/:id', logsCtrl.updateLog);
router.delete('/:id', logsCtrl.deleteLog);

module.exports = router;