const { createServer } = require('node:http');
const axios = require('axios');
const https = require('node:https');

const hostname = '127.0.0.1'; // Localhost is fine for this setup
const port = process.env.PORT || 3000; // Port is usually set by the hosting environment

// Create an HTTPS agent that allows self-signed certificates
const httpsAgent = new https.Agent({
  rejectUnauthorized: false // Allow self-signed certificates
});

const server = createServer(async (req, res) => {
  // Log request information for debugging
  console.log(`Received request: ${req.method} ${req.url}`);

  if (req.method === 'GET' && req.url === '/apps/ndjs28') {
    try {
      // URL to make GET request to
      const url = 'https://80.96.41.152:55301/api'; // Make sure the URL is correct

      // Make GET request using axios with custom headers and HTTPS agent
      const response = await axios.get(url, {
        headers: {
          'Host': '80.96.41.152' // Custom Host header
        },
        httpsAgent // Use the custom HTTPS agent
      });

      // Send the result to the browser
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(`
        <html>
          <body>
            <h1>GET Request Result</h1>
            <pre>${JSON.stringify(response.data, null, 2)}</pre>
          </body>
        </html>
      `);
    } catch (error) {
      // Handle error
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/html');
      res.end(`
        <html>
          <body>
            <h1>Error</h1>
            <pre>${error.message}</pre>
          </body>
        </html>
      `);
    }
  } else {
    // Handle other routes
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <html>
        <body>
          <h1>404 Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </body>
      </html>
    `);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
