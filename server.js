const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the Angular dist folder
app.use(express.static(path.join(__dirname, 'dist/Cinemo/browser')));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/Cinemo/browser', 'index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});