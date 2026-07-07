const mongoose = require('mongoose');
const logger = require('./logger');
const dns = require('dns');

dns.setServers(['1.1.1.1', '8.8.8.8']);
const connectDB = async () => {
  try {
    logger.info('Connecting to MongoDB...');

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    logger.info('MongoDB connected successfully.');

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected.');
    });

    mongoose.connection.on('error', (err) => {
      logger.error(err);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
