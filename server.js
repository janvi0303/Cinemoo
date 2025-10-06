const express = require('express');
const path = require('path');
const jsonServer = require('json-server');

const app = express();

// Serve Angular static files
app.use(express.static(path.join(__dirname, 'dist/Cinemo/browser')));

// JSON Server for users data (authentication)
app.use('/users', jsonServer.router('db.json'));

// Catch all other routes and return the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/Cinemo/browser', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Angular app: http://localhost:${port}`);
  console.log(`JSON Server API: http://localhost:${port}/users`);
});