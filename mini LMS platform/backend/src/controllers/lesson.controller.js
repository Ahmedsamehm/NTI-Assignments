const APIResponse = require('../utils/APIResponse');
const ApiError = require('../utils/ApiError');
const lessonService = require('../services/lesson.service');

const createLesson = async (req, res, next) => {
  try {
    const lesson = await lessonService.createLesson(req.params.courseId, req.body, req.user);
    new APIResponse(201, 'Lesson created successfully', lesson).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const getLessons = async (req, res, next) => {
  try {
    const lessons = await lessonService.getLessons(req.params.courseId);
    new APIResponse(200, 'Lessons fetched successfully', lessons).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const getLessonById = async (req, res, next) => {
  try {
    const lesson = await lessonService.getLessonById(req.params.courseId, req.params.lessonId);
    new APIResponse(200, 'Lesson fetched successfully', lesson).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const updateLesson = async (req, res, next) => {
  try {
    const lesson = await lessonService.updateLesson(req.params.courseId, req.params.lessonId, req.body, req.user);
    new APIResponse(200, 'Lesson updated successfully', lesson).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const deleteLesson = async (req, res, next) => {
  try {
    await lessonService.deleteLesson(req.params.courseId, req.params.lessonId, req.user);
    new APIResponse(200, 'Lesson deleted successfully').send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

module.exports = {
  createLesson,
  getLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
};
