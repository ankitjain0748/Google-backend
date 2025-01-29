const express = require('express');
const router = express.Router();
const directionsController = require('../controller/directionsController');

router.post('/cordintors', directionsController.getDirections);

router.post("/location" , directionsController.LocationSearch)

module.exports = router;
