const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/api/v1/inventory', controller.getInventory);
router.get('/api/v1/order', controller.getOrder);
router.post('/api/v1/order', controller.addOrder);

module.exports = router;