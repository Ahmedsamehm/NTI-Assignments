const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const { authorize } = require('../middlewares/role-middleware');
const Roles = require('../constants/roles');
const { getAllCourses, createCourse, deleteCourse, getCourseById, updateCourse, getMyCourse } = require('../controllers/courses.controller');
const lessonRoutes = require('./lesson.routes');

// /courses ,{GET,PATCH,DELETE} course:id , {POST} course ,

router.get('/', getAllCourses);

router.use(authMiddleware);

// /my MUST come before /:id — otherwise Express captures "my" as the :id param
router.get('/my', getMyCourse);
router.post('/', authorize(Roles.ADMIN, Roles.INSTRUCTOR), createCourse);

router.get('/:id', getCourseById);
router.delete('/:id', authorize(Roles.ADMIN, Roles.INSTRUCTOR), deleteCourse);
router.patch('/:id', authorize(Roles.ADMIN, Roles.INSTRUCTOR), updateCourse);

router.use('/:courseId/lessons', lessonRoutes);

module.exports = router;
