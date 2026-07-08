const Enrollment = require('../models/enrollment.model');
const Course = require('../models/course.model');
const ApiError = require('../utils/ApiError');

const checkEnrollment = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return next(new ApiError(404, 'Course not found'));
    }

    if (!course.isPaid) {
      return next();
    }

    const enrollment = await Enrollment.findOne({
      student: req.user._id,
      course: courseId,
    });

    if (!enrollment || !enrollment.isPaidDemo) {
      return next(new ApiError(403, 'You have not purchased this course'));
    }

    req.enrollment = enrollment;
    next();
  } catch (err) {
    next(new ApiError(500, err.message || 'Internal server error'));
  }
};

module.exports = checkEnrollment;
