const express = require('express');
const cors = require('cors');
const ApiError = require('./utils/ApiError');
const routes = require('./routes');
const app = express();
// Parse json request body
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// API Routes
app.use('/api', routes);

// Send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(404, 'Not found'));
});

module.exports = app;
