const Course = require('../models/course.model');
const ApiError = require('../utils/ApiError');
const usePagination = require('../utils/usePagination');
const ROLES = require('../constants/roles');

/*
page=1
limit=10

search=react
category=frontend

minPrice=100
maxPrice=500

sortBy=createdAt
order=desc

*/
const buildCourseQueryAndSort = (queryParams) => {
  const { sort, order, ...filters } = queryParams;

  const query = {};

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.search) {
    query.title = {
      $regex: filters.search,
      $options: 'i',
    };
  }

  if (filters.minPrice || filters.maxPrice) {
    query.price = {};

    if (filters.minPrice) {
      query.price.$gte = Number(filters.minPrice);
    }

    if (filters.maxPrice) {
      query.price.$lte = Number(filters.maxPrice);
    }
  }

  if (filters.rating) {
    query.rating = Number(filters.rating);
  }

  if (filters.instructor) {
    query.instructor = filters.instructor;
  }

  const sortOptions = {
    [sort || 'createdAt']: order === 'asc' ? 1 : -1,
  };

  return { query, sortOptions };
};

const getCourses = async (queryParams) => {
  const { req } = queryParams;
  const { query, sortOptions } = buildCourseQueryAndSort(queryParams);

  const { data, meta } = await usePagination(req, Course, {
    query,
    sort: sortOptions,
  });

  return { data, meta };
};

const getMyCourse = async (queryParams) => {
  const { req } = queryParams;
  const { query, sortOptions } = buildCourseQueryAndSort(queryParams);

  // Filter courses by the authenticated instructor's ID
  query.instructor = req.user._id;

  const { data, meta } = await usePagination(req, Course, {
    query,
    sort: sortOptions,
  });

  return { data, meta };
};
const getCourseById = async (id) => {
  const course = await Course.findById(id);
  if (!course) {
    throw new ApiError(404, 'Course not found');
  }
  return course;
};

const createCourse = async (courseData) => {
  const { body, user } = courseData;

  let instructorId;

  if (user.role === ROLES.ADMIN) {
    if (!body.instructor) {
      throw new ApiError(
        400,
        'Instructor ID is required to create a course as an admin'
      );
    }
    instructorId = body.instructor;
  } else if (user.role === ROLES.INSTRUCTOR) {
    instructorId = user._id;
  } else {
    throw new ApiError(403, 'Only admins and instructors can create courses');
  }

  const course = await Course.create({
    ...body,
    instructor: instructorId,
  });

  return course;
};

const updateCourse = async (req) => {
  const { _id, role } = req.user;
  const { id } = req.params;

  const getCourse = await Course.findById(id);
  if (!getCourse) {
    throw new ApiError(404, 'Course not found');
  }

  if (
    getCourse.instructor?.toString() !== _id.toString() &&
    role !== ROLES.ADMIN
  ) {
    throw new ApiError(403, 'Not allowed to update this course');
  }

  const course = await Course.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  return course;
};

const deleteCourse = async (req) => {
  const { _id, role } = req.user;
  const { id } = req.params;

  const getCourse = await Course.findById(id);
  if (!getCourse) {
    throw new ApiError(404, 'Course not found');
  }

  if (
    getCourse.instructor?.toString() !== _id.toString() &&
    role !== ROLES.ADMIN
  ) {
    throw new ApiError(403, 'Not allowed to delete this course');
  }

  await Course.findByIdAndDelete(id);
};

module.exports = {
  getCourses,
  getMyCourse,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
