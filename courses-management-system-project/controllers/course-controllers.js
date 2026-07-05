const course = require("../modules/course-model");

// Get all courses
const getAllCourses = async (req, res) => {
  const courses = await course.find();
  res.status(200).json({
    status: "success",
    count: courses.length,
    data: {
      courses,
    },
  });
};

// Create a new course
const createCourse = async (req, res) => {
 try {
    const category=req.body.category.toLowerCase();
  const level =req.body.level.toLowerCase();
  const newCourse = await course.create({
    ...req.body,
    category,
    level,
  });
  res.status(201).json({
    status: "success",
    message: "New course added",
    data: {
      course: newCourse,
    },
  });
 }
 catch (error) {
  res.status(500).json({
    status: "error",
    message: "Error creating course",
    error,
  });
 }


};

// Get course by ID
const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const getCourse = await course.findById(courseId);
    if (getCourse)
      res.status(200).json({
        status: "success",
        data: {
          course: getCourse,
        },
      });
  } catch (err) {
     res.status(404).json({
      status: "error",
      message: "Course not found",
    });
  }
};

// Update course
const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const category = req.body.category.toLowerCase();
    const level = req.body.level.toLowerCase();
    const updatedCourse = await course.findByIdAndUpdate(courseId, {
      ...req.body,
      category,
      level,
    });
    if (updatedCourse) {
      res.status(200).json({
        status: "success",
        message: "Course updated successfully",
        data: {
          course: updatedCourse,
        },
      });
    }
  } catch (err) {
    return res.status(404).json({
      status: "error",
      message: "Course not found",
    });
  }
};

// Delete course
const deleteCourse = async (req, res) => {
  try{
    const deleteCourse = await course.findByIdAndDelete(req.params.id)
 if (!deleteCourse) {
    return res.status(404).json({
      status: "error",
      message: "Course not found",
    });
  }
 res.status(200).json({
        status: "success",
        message: "Course deleted successfully",
        data: {
          course: deleteCourse,
        },
      });
  } catch (err) {
    return res.status(404).json({
      status: "error",
      message: "Error deleting course",
    });
  }

 


     
}

module.exports = {
  getAllCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
};