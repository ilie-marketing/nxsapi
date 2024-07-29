// Import the required modules
const express = require('express');
const axios = require('axios');

// Create an instance of an Express app
const app = express();
const port = 3000; // Port to listen on

// Define the route to handle incoming requests
app.get('/', async (req, res) => {
  try {
    // Make a GET request to the specified API with custom headers
    const response = await axios.get('http://80.96.41.152:55301/api', {
      headers: {
        'Host': '80.96.41.152'
      }
    });

    // Log the result and send it in the response
    console.log('API Response:', response.data);
    res.send(response.data);
  } catch (error) {
    // Handle errors
    console.error('Error making API request:', error.message);
    res.status(500).send('Error making API request');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
