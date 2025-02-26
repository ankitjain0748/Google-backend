const express = require('express');
const router = express.Router();
const PlaceController = require('../controller/PlaceController');
const { getLocation ,SerachMalitpleLocation } = require('../controller/locationController');
const { apiKeygetAirQuality, getRoad  , getSolarData, getPollenData} = require('../controller/AirQuality');

router.post('/searchPlaces', PlaceController.searchPlaces);
router.post('/nearbySearch', PlaceController.nearbySearch);
router.get('/placesDetilas/:placeId', PlaceController.getPlaceDetails);


// Get Address 
router.post('/address', SerachMalitpleLocation);

// Air Quality

router.post("/airquality" ,apiKeygetAirQuality)


// Roads Daata
router.get("/roads" ,  getRoad)


// Solar Data

router.get("/solar" , getSolarData)

// router.get("/pollar" , getPollenData)







module.exports = router;

