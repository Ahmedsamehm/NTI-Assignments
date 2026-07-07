const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const usersRoutes = require('./users.routes');
const coursesRoutes = require('./courses.routes');
const enrollmentRoutes = require('./enrollment.routes');

// Route mappings
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/courses', coursesRoutes);
router.use('/enrollments', enrollmentRoutes);

module.exports = router;
