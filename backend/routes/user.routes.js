const express = require('express');
const router = express.Router();
//controller
const userCtrl = require('../src/controllers/user.controller');

router.get('/', userCtrl.getAll);
/*router.post('/', userCtrl.create);
router.get('/:id', userCtrl.getItem);
router.patch('/:id', userCtrl.update);
router.delete('/:id', userCtrl.delete);
*/

module.exports = router;