const axios = require('axios');

exports.apiKeygetAirQuality = async (req, res) => {
    const { lat, lon } = req.body;
    console.log("Request Body:", req.body);
    if (!lat || !lon) {
        return res.status(400).json({ error: 'Please provide latitude (lat) and longitude (lon).' });
    }
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;  // Use OpenWeather API key here
        if (!apiKey) {
            return res.status(500).json({ error: 'API key not provided.' });
        }

        const response = await axios.get("https://api.openweathermap.org/data/2.5/air_pollution", {
            params: {
                lat,
                lon,
                appid: process.env.GOOGLE_MAPS_API_KEY,
            },
        });

        console.log("API Response Data:", response.data);
        res.json({
            location: { lat, lon },
            airQuality: response.data,
        });
    } catch (error) {
        if (error.response) {
            console.error("API Error Response:", error.response.data);
            return res.status(500).json({
                error: 'Failed to fetch air quality data',
                details: error.response.data,
            });
        } else {
            console.error("Request Error:", error.message);
            return res.status(500).json({
                error: 'Failed to fetch air quality data',
                details: error.message,
            });
        }
    }
};

exports.getRoad = async (req, res) => {
    const { points } = req.query;
    console.log('Points:', points); 
    const formattedPoints = points.split('|').join('|'); 
    try {
        const response = await axios.get('https://roads.googleapis.com/v1/nearestRoads', {
            params: {
                points: formattedPoints,
                key:  process.env.GOOGLE_MAPS_API_KEY , 
            },
        });

        console.log('API Response:', response.data); 
        if (response.data) {
            res.json(response.data); 
        } else {
            throw new Error('Unexpected API response structure');
        }
    } catch (error) {
        console.error('Error:', error.message); 

        
        if (error.response) {
            console.error('Error Data:', error.response.data);
            console.error('Error Status:', error.response.status);
            res.status(error.response.status).json({ error: error.response.data.error_message || 'An error occurred' });
        } else if (error.request) {
           
            console.error('Error Request:', error.request);
            res.status(500).json({ error: 'No response received from the API' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};





exports.getSolarData = async (req, res) => {
  const { latitude, longitude } = req.query;
const apiKey =process.env.GOOGLE_MAPS_API_KEY; 

  if (!latitude || !longitude) {
    return res.status(400).render('index', { error: 'Please provide valid latitude and longitude.' });
  }
  try {
    const response = await axios.get(`https://solar.googleapis.com/v1/roof:estimateSolarPotential?latlng=${latitude},${longitude}&key=${apiKey}`);

    return res.status(200).json({
      location: { latitude, longitude },
      solarData: response.data,
    });

  } catch (error) {
    return res.status(500).json({ error: 'Could not retrieve solar data. Please try again later.' });
  }
};




// exports.getPollenData = async (req, res) => {
//     const { latitude, longitude } = req.query;

//     // Check if latitude and longitude are provided
//     if (!latitude || !longitude) {
//         return res.status(400).render('index', { error: 'Please provide valid latitude and longitude.' });
//     }

//     try {
//         // Request to pollen data provider API
//         const response = await axios.get(`https://api.example-pollen-provider.com/v1/pollen?lat=${latitude}&lon=${longitude}`, {
//             headers: {
//                 'Authorization': `Bearer ${apiKey}`
//             }
//         });

//         // Send response in JSON format with the status code 200
//         return res.status(200).json({
//             location: { latitude, longitude },
//             pollenData: response.data
//         });

//     } catch (error) {
//         // Log the error for debugging
//         console.error('Error fetching pollen data:', error.message);

//         // Check if the error has a response from the server
//         if (error.response) {
//             return res.status(error.response.status).json({ error: error.response.data });
//         } else {
//             return res.status(500).json({ error: 'Could not retrieve pollen data. Please try again later.' });
//         }
//     }
// };


