const APIResponse = require('../utils/APIResponse');
const ApiError = require('../utils/ApiError');
const courseService = require('../services/courses.service');

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await courseService.getCourses({ ...req.query, req });
    new APIResponse(200, 'Courses fetched successfully', courses).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};
const getMyCourse = async (req, res, next) => {
  try {
    const courses = await courseService.getMyCourse({ ...req.query, req });
    new APIResponse(200, 'Courses fetched successfully', courses).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await courseService.getCourseById(id);
    new APIResponse(200, 'Course fetched successfully', course).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const createCourse = async (req, res, next) => {
  try {
    const course = await courseService.createCourse(req);
    new APIResponse(201, 'Course created successfully', course).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const course = await courseService.updateCourse(req);
    new APIResponse(200, 'Course updated successfully', course).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const course = await courseService.deleteCourse(req);
    new APIResponse(200, 'Course deleted successfully', course).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  getMyCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
