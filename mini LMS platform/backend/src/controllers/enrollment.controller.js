const APIResponse = require('../utils/APIResponse');
const ApiError = require('../utils/ApiError');
const enrollmentService = require('../services/enrollment.service');

const enroll = async (req, res, next) => {
  try {
    const enrollment = await enrollmentService.enroll(req.body.courseId, req.user._id);
    new APIResponse(201, 'Enrolled successfully', enrollment).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const getMyEnrollments = async (req, res, next) => {
  try {
    const { data, meta } = await enrollmentService.getMyEnrollments(req.user._id, req.query, req);
    new APIResponse(200, 'Enrollments fetched successfully', data, meta).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const getEnrollmentById = async (req, res, next) => {
  try {
    const enrollment = await enrollmentService.getEnrollmentById(req.params.id);
    new APIResponse(200, 'Enrollment fetched successfully', enrollment).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const updateProgress = async (req, res, next) => {
  try {
    const enrollment = await enrollmentService.updateProgress(req.params.id, req.user._id, req.body.lessonId);
    new APIResponse(200, 'Progress updated successfully', enrollment).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const getCourseEnrollments = async (req, res, next) => {
  try {
    const { data, meta } = await enrollmentService.getCourseEnrollments(req.params.courseId, req.user, req);
    new APIResponse(200, 'Course enrollments fetched successfully', data, meta).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const getAllEnrollments = async (req, res, next) => {
  try {
    const { data, meta } = await enrollmentService.getAllEnrollments(req.query, req);
    new APIResponse(200, 'Enrollments fetched successfully', data, meta).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const deleteEnrollment = async (req, res, next) => {
  try {
    await enrollmentService.deleteEnrollment(req.params.id);
    new APIResponse(200, 'Enrollment deleted successfully').send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
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
