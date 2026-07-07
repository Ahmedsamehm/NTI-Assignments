const mongoose = require('mongoose');
const ROLES = require('../constants/roles');
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'name is required'] },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: [ROLES.ADMIN, ROLES.INSTRUCTOR, ROLES.STUDENT],
        message: 'Role must be one of: ' + Object.values(ROLES).join(', '),
      },
      default: ROLES.STUDENT,
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    otpVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
