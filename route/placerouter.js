const express = require('express');
const router = express.Router();
const PlaceController = require('../controller/PlaceController');
const { getLocation } = require('../controller/locationController');
const { apiKeygetAirQuality, getRoad  , getSolarData, getPollenData} = require('../controller/AirQuality');

router.get('/placesDetilas/:placeId', PlaceController.getPlaceDetails);

router.post('/searchPlaces', PlaceController.searchPlaces);

router.post('/nearbySearch', PlaceController.nearbySearch);

// Get Address 
router.post('/address', getLocation);

// Air Quality

router.post("/airquality" ,apiKeygetAirQuality)


// Roads Daata
router.get("/roads" ,  getRoad)


// Solar Data

router.get("/solar" , getSolarData)

// router.get("/pollar" , getPollenData)







module.exports = router;

