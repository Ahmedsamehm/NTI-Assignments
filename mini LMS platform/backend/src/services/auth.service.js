const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const { generateToken } = require('../utils/get-jwt');
const { generateOtp, verifyOtp } = require('../utils/generateOtp');
const ROLES = require('../constants/roles');

const register = async ({ name, email, password, confirmPassword }) => {
  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    throw new ApiError(400, 'Email already exists');
  }

  if (password !== confirmPassword) {
    throw new ApiError(400, 'Passwords do not match');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: ROLES.STUDENT,
  });

  return {
    _id: createUser._id,
    name: createUser.name,
    email: createUser.email,
    role: ROLES.STUDENT,
  };
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

const refreshToken = (refreshTokenValue) => {
  if (!refreshTokenValue) {
    throw new ApiError(401, 'Refresh token missing');
  }

  try {
    const payload = jwt.verify(
      refreshTokenValue,
      process.env.REFRESH_TOKEN_SECRET
    );
    const accessToken = generateToken({
      _id: payload._id,
      role: payload.role,
    });

    return {
      accessToken,
      _id: payload._id,
      role: payload.role,
    };
  } catch {
    throw new ApiError(401, 'Invalid refresh token');
  }
};

const forgetPassword = async ({ email }) => {
  if (!email) {
    throw new ApiError(400, 'Email is required');
  }

  const isEmailExist = await User.findOne({ email });
  if (!isEmailExist) {
    throw new ApiError(404, 'User not found');
  }

  const { otp, hashedOtp } = await generateOtp();
  isEmailExist.otp = hashedOtp;
  isEmailExist.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  isEmailExist.otpVerified = false;
  await isEmailExist.save();

  return { otp };
};

const verifyOtpCode = async ({ email, otp }) => {
  if (!email || !otp) {
    throw new ApiError(400, 'Email and OTP code are required');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (!user.otp || !user.otpExpiry) {
    throw new ApiError(
      400,
      'OTP is invalid or no active reset request exists.'
    );
  }

  if (user.otpExpiry < new Date()) {
    throw new ApiError(400, 'OTP has expired');
  }

  const isOtpValid = await verifyOtp(otp, user.otp);
  if (!isOtpValid) {
    throw new ApiError(400, 'Invalid OTP');
  }

  user.otpVerified = true;
  user.otp = undefined;
  await user.save();
};

const resetPassword = async ({ email, password, confirmPassword }) => {
  if (!email || !password || !confirmPassword) {
    throw new ApiError(
      400,
      'All fields are required (email, password, confirmPassword)'
    );
  }

  if (password !== confirmPassword) {
    throw new ApiError(400, 'Passwords do not match');
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (!user.otpVerified) {
    throw new ApiError(400, 'OTP verification is required first');
  }

  if (user.otpExpiry < new Date()) {
    throw new ApiError(
      400,
      'OTP verification has expired. Please request a new OTP.'
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.otp = undefined;
  user.otpExpiry = undefined;
  user.otpVerified = false;
  await user.save();
};

module.exports = {
  register,
  login,
  refreshToken,
  forgetPassword,
  verifyOtpCode,
  resetPassword,
};
