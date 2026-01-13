const express = require('express');
const router = express.Router();
//controller
const restaurantCtrl = require('../src/controllers/restaurant.controller');

router.get('/', restaurantCtrl.getAll);
/*router.post('/', restaurantCtrl.create);
router.get('/:id', restaurantCtrl.getItem);
router.patch('/:id', restaurantCtrl.update);
router.delete('/:id', restaurantCtrl.delete);
*/

module.exports = router;