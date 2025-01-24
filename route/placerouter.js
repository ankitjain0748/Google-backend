const express = require('express');
const router = express.Router();
const PlaceController = require('../controller/PlaceController');

router.get('/placesDetilas/:placeId', PlaceController.getPlaceDetails);

router.post('/searchPlaces', PlaceController.searchPlaces);
router.post('/nearbySearch', PlaceController.nearbySearch);



module.exports = router;

