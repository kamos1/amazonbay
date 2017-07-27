const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/inventory', controller.getInventory);

module.exports = router;