
const axios = require('axios'); 

const getLocation = async (req, res) => {
  const { address } = req.body;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY; 

  if (!address) {
    return res.status(400).json({ message: 'Address is required' });
  }

  
  const formattedAddress = `${address.street_address}, ${address.nearby}, ${address.district}, ${address.city}, ${address.state}, ${address.pin}`;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address: formattedAddress,
          key: apiKey,
        },
      }
    );

    const { results } = response.data;

    if (results && results.length > 0) {
      const location = results[0]?.geometry?.location;
      const formattedAddress = results[0]?.formatted_address;

      return res.status(200).json({
        markerPosition: { lat: location?.lat, lng: location?.lng },
        center: { lat: location?.lat, lng: location?.lng },
        updatedAddress: {
          ...address,
          location: formattedAddress,
          latitude: location?.lat,
          longitude: location?.lng,
        },
        locationName: formattedAddress,
      });
    } else {
      return res.status(404).json({ message: 'Location not found' });
    }
  } catch (error) {
    console.error('Error fetching location:', error.message);
    return res.status(500).json({ message: 'Error fetching location data' });
  }
};

const SerachMalitpleLocation = async (req, res) => {
  const { address } = req.body;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY; 

  if (!address) {
    return res.status(400).json({ message: 'Address is required' });
  }

  
  // const formattedAddress = `${address.street_address}, ${address.nearby}, ${address.district}, ${address.city}, ${address.state}, ${address.pin}`;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address: address,
          key: apiKey,
        },
      }
    );

    const { results } = response.data;

    if (results && results.length > 0) {
      const location = results[0]?.geometry?.location;
      const formattedAddress = results[0]?.formatted_address;

      return res.status(200).json({
        markerPosition: { lat: location?.lat, lng: location?.lng },
        center: { lat: location?.lat, lng: location?.lng },
        updatedAddress: {
          ...address,
          location: formattedAddress,
          latitude: location?.lat,
          longitude: location?.lng,
        },
        locationName: formattedAddress,
      });
    } else {
      return res.status(404).json({ message: 'Location not found' });
    }
  } catch (error) {
    console.error('Error fetching location:', error.message);
    return res.status(500).json({ message: 'Error fetching location data' });
  }
};

module.exports = { getLocation , SerachMalitpleLocation };
