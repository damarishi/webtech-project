const express = require('express');
const router = express.Router();
//controller
const requestCtrl = require('../controllers/restaurant_request.controller');

router.get('/', requestCtrl.getAll);
router.post('/', requestCtrl.createRequest);
router.put('/approve/:id', requestCtrl.approveRequest);
router.put('/reject/:id', requestCtrl.rejectRequest);
router.put('/:id', requestCtrl.updateRequest);

/*router.get('/:id', requestCtrl.getItem);
router.patch('/:id', requestCtrl.update);
router.delete('/:id', requestCtrl.delete);
*/

module.exports = router;