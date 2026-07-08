const express = require('express');
const router = express.Router({ mergeParams: true });
const authMiddleware = require('../middlewares/auth-middleware');
const { authorize } = require('../middlewares/role-middleware');
const Roles = require('../constants/roles');
const { createLesson, getLessons, getLessonById, updateLesson, deleteLesson } = require('../controllers/lesson.controller');
const checkEnrollment = require('../middlewares/enrollment-middleware');

router.use(authMiddleware);

router.get('/', checkEnrollment, getLessons);
router.get('/:lessonId', checkEnrollment, getLessonById);
router.post('/', authorize(Roles.ADMIN, Roles.INSTRUCTOR), createLesson);
router.patch('/:lessonId', authorize(Roles.ADMIN, Roles.INSTRUCTOR), updateLesson);
router.delete('/:lessonId', authorize(Roles.ADMIN, Roles.INSTRUCTOR), deleteLesson);

module.exports = router;
