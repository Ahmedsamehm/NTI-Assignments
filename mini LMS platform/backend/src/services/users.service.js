const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const usePagination = require('../utils/usePagination');

const getProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};

const createUser = async ({ email, password, name, role }) => {
  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    throw new ApiError(400, 'Email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashedPassword,
    name,
    role,
  });

  return user;
};

const getUsers = async (queryParams, req) => {
  const filter = {};
  if (queryParams.role) {
    filter.role = queryParams.role;
  }
  if (queryParams.email) {
    filter.email = {
      $regex: queryParams.email,
      $options: 'i',
    };
  }

  const { data, meta } = await usePagination(req, User, {
    query: filter,
    sort: { createdAt: -1 },
  });

  return { data, meta };
};

const getUserById = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};

const updateUser = async (userId, updates) => {
  const { password, ...rest } = updates;

  const user = await User.findByIdAndUpdate(userId, rest, {
    new: true,
    runValidators: true,
  }).select('-password');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};

const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
};

module.exports = {
  getProfile,
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
