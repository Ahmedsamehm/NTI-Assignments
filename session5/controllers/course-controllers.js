const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "../data/courses-data.json");
let courses = JSON.parse(fs.readFileSync(dataFile, "utf-8"));

const getAllCourses = (req, res) => {
  res.status(200).json({
    status: "success",
    count: courses.length,
    data: {
      courses,
    },
  });
};

const getCourseById = (req, res) => {
  const courseId = +req.params.id;
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return res.status(404).json({
      status: "error",
      message: "Course not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      course,
    },
  });
};

const createCourse = (req, res) => {
  const newId = courses[courses.length - 1].id + 1;
  const newCourse = {
    id: newId,
    ...req.body,
  };

  courses.push(newCourse);

  fs.writeFile(dataFile, JSON.stringify(courses, null, 2), () => {
    res.status(201).json({
      status: "success",
      message: "New course added",
      data: {
        course: newCourse,
      },
    });
  });
};

const updateCourse = (req, res) => {
  const courseId = +req.params.id;
  const course = courses.find((c) => c.id === courseId);
  const index = courses.findIndex((c) => c.id === courseId);

  if (!course) {
    return res.status(404).json({
      status: "error",
      message: "Course not found",
    });
  }

  const updatedCourse = Object.assign(course, req.body);
  courses[index] = updatedCourse;

  fs.writeFile(dataFile, JSON.stringify(courses, null, 2), () => {
    res.status(200).json({
      status: "success",
      message: "Course updated successfully",
      data: {
        course: updatedCourse,
      },
    });
  });
};

const deleteCourse = (req, res) => {
  const courseId = +req.params.id;
  const course = courses.find((c) => c.id === courseId);
  const index = courses.findIndex((c) => c.id === courseId);

  if (!course) {
    return res.status(404).json({
      status: "error",
      message: "Course not found",
    });
  }

  courses.splice(index, 1);

  fs.writeFile(dataFile, JSON.stringify(courses, null, 2), () => {
    res.status(200).json({
      status: "success",
      message: "Course deleted successfully",
      data: {
        course,
      },
    });
  });
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
