const express = require('express');
const cors = require('cors');
const ApiError = require('./utils/ApiError');
const routes = require('./routes');
const app = express();
const cookieParser = require('cookie-parser');

// we can use compression  in future to optimize performance
// const compression =require("compression ")
//app.use(compression())

// Parse json request body
app.use(cookieParser());
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// API Routes
app.use('/api/v1/', routes);

// Send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(404, `Path not found: ${req.originalUrl}`));
});
//error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    statusCode,
    message: err.message,
  });
});
module.exports = app;
