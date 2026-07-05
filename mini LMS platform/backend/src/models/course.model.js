const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  isPaid: { type: Boolean, default: false },
  price: { type: Number, default: 0 }, // only used if isPaid is true
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
