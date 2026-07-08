const Enrollment = require('../models/enrollment.model');
const Course = require('../models/course.model');
const ApiError = require('../utils/ApiError');
const usePagination = require('../utils/usePagination');

const enroll = async (courseId, studentId) => {
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  const existingEnrollment = await Enrollment.findOne({
    student: studentId,
    course: courseId,
  });

  if (existingEnrollment) {
    throw new ApiError(400, 'Already enrolled in this course');
  }

  const enrollment = await Enrollment.create({
    student: studentId,
    course: courseId,
    isPaidDemo: course.isPaid,
  });

  return enrollment;
};

const getMyEnrollments = async (studentId, queryParams, req) => {
  const { data, meta } = await usePagination(req, Enrollment, {
    query: { student: studentId },
    sort: { createdAt: -1 },
    populate: {
      path: 'course',
      select: '-__v -sections',
    },
  });

  return { data, meta };
};

const getEnrollmentById = async (enrollmentId) => {
  const enrollment = await Enrollment.findById(enrollmentId).populate('course', '-__v');

  if (!enrollment) {
    throw new ApiError(404, 'Enrollment not found');
  }

  return enrollment;
};

const updateProgress = async (enrollmentId, studentId, lessonId) => {
  const enrollment = await Enrollment.findById(enrollmentId).populate('course', '-__v');

  if (!enrollment) {
    throw new ApiError(404, 'Enrollment not found');
  }

  if (enrollment.student.toString() !== studentId) {
    throw new ApiError(403, 'Not authorized to update this enrollment');
  }

  const alreadyCompleted = enrollment.completedLessons.some((item) => item.lesson.toString() === lessonId);

  if (!alreadyCompleted) {
    enrollment.completedLessons.push({ lesson: lessonId, completedAt: new Date() });
  }

  const totalLessons = enrollment.course.lessons.length;
  enrollment.progress = totalLessons > 0 ? Math.round((enrollment.completedLessons.length / totalLessons) * 100) : 0;

  await enrollment.save();

  return enrollment;
};

const getCourseEnrollments = async (courseId, user, req) => {
  const course = await Course.findById(courseId).populate('course', '-__v');
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  if (user.role === 'instructor' && course.instructor?.toString() !== user._id.toString()) {
    throw new ApiError(403, 'Not authorized to view enrollments for this course');
  }

  const { data, meta } = await usePagination(req, Enrollment, {
    query: { course: courseId },
    sort: { createdAt: -1 },
    populate: 'student',
    select: '-password',
  });

  return { data, meta };
};

const getAllEnrollments = async (queryParams, req) => {
  const { data, meta } = await usePagination(req, Enrollment, {
    query: {},
    sort: { createdAt: -1 },
    populate: 'student',
    select: '-password',
  });

  return { data, meta };
};

const deleteEnrollment = async (enrollmentId) => {
  const enrollment = await Enrollment.findByIdAndDelete(enrollmentId);
  if (!enrollment) {
    throw new ApiError(404, 'Enrollment not found');
  }

  return enrollment;
};

module.exports = {
  enroll,
  getMyEnrollments,
  getEnrollmentById,
  updateProgress,
  getCourseEnrollments,
  getAllEnrollments,
  deleteEnrollment,
};
