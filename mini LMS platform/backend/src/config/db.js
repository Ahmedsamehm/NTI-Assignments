const mongoose = require('mongoose');
const logger = require('./logger');
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);
const connectDB = async () => {
  try {
    logger.info(`Connecting to database at ${process.env.MONGO_URI}...`);
    await mongoose.connect(process.env.MONGO_URI);
    logger.info('Database connected successfully.');
  } catch (error) {
    logger.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
