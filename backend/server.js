// Import the Express module
const express = require('express');

// Create an instance of an Express application
const app = express();

// Define a port number
const PORT =8000;

// Define a GET route
app.get('/home', (req, res) => {
  res.send("this is my backend")
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
