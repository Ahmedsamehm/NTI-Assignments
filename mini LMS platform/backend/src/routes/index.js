const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');

// Route mappings
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
