const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const { authorize } = require('../middlewares/role-middleware');
const Roles = require('../constants/roles');
const {
  enroll,
  getMyEnrollments,
  getEnrollmentById,
  updateProgress,
  getCourseEnrollments,
  getAllEnrollments,
  deleteEnrollment,
} = require('../controllers/enrollment.controller');

router.use(authMiddleware);

router.post('/', authorize(Roles.STUDENT), enroll);
router.get('/me', authorize(Roles.STUDENT), getMyEnrollments);
router.get('/:id', getEnrollmentById);
router.patch('/:id/progress', authorize(Roles.STUDENT), updateProgress);
router.get('/course/:courseId', authorize(Roles.ADMIN, Roles.INSTRUCTOR), getCourseEnrollments);
router.get('/', authorize(Roles.ADMIN), getAllEnrollments);
router.delete('/:id', authorize(Roles.ADMIN), deleteEnrollment);

module.exports = router;
