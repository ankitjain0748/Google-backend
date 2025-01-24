const express = require('express');
const router = express.Router();
const directionsController = require('../controller/directionsController');

router.post('/cordintors', directionsController.getDirections);

module.exports = router;
