const Lesson = require('../models/lesson.model');
const Course = require('../models/course.model');
const ApiError = require('../utils/ApiError');
const ROLES = require('../constants/roles');

const createLesson = async (courseId, lessonData, user) => {
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  if (user.role === ROLES.INSTRUCTOR && course.instructor?.toString() !== user._id.toString()) {
    throw new ApiError(403, 'Not authorized to add lessons to this course');
  }

  const lastLesson = await Lesson.findOne({ course: courseId }).sort({ order: -1 });
  const order = lastLesson ? lastLesson.order + 1 : 1;

  const lesson = await Lesson.create({
    ...lessonData,
    order,
    course: courseId,
  });

  course.lessons.push(lesson._id);
  await course.save();

  return lesson;
};

const getLessons = async (courseId) => {
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  const lessons = await Lesson.find({ course: courseId }).sort({ order: 1 });

  return lessons;
};

const getLessonById = async (courseId, lessonId) => {
  const lesson = await Lesson.findOne({ _id: lessonId, course: courseId });
  if (!lesson) {
    throw new ApiError(404, 'Lesson not found');
  }

  return lesson;
};

const updateLesson = async (courseId, lessonId, updateData, user) => {
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  if (user.role === ROLES.INSTRUCTOR && course.instructor?.toString() !== user._id.toString()) {
    throw new ApiError(403, 'Not authorized to update lessons in this course');
  }

  const lesson = await Lesson.findOneAndUpdate({ _id: lessonId, course: courseId }, updateData, { new: true, runValidators: true });

  if (!lesson) {
    throw new ApiError(404, 'Lesson not found');
  }

  return lesson;
};

const deleteLesson = async (courseId, lessonId, user) => {
  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }

  if (user.role === ROLES.INSTRUCTOR && course.instructor?.toString() !== user._id.toString()) {
    throw new ApiError(403, 'Not authorized to delete lessons from this course');
  }

  const lesson = await Lesson.findOneAndDelete({ _id: lessonId, course: courseId });
  if (!lesson) {
    throw new ApiError(404, 'Lesson not found');
  }

  course.lessons.pull(lessonId);
  await course.save();

  const remainingLessons = await Lesson.find({ course: courseId }).sort({ order: 1 });
  for (let i = 0; i < remainingLessons.length; i++) {
    remainingLessons[i].order = i + 1;
    await remainingLessons[i].save();
  }

  return lesson;
};

module.exports = {
  createLesson,
  getLessons,
  getLessonById,
  updateLesson,
  deleteLesson,
};
