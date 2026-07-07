const APIResponse = require('../utils/APIResponse');
const ApiError = require('../utils/ApiError');
const usersService = require('../services/users.service');

const getProfile = async (req, res, next) => {
  try {
    const user = await usersService.getProfile(req.user._id);
    new APIResponse(200, 'Profile fetched successfully', user).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await usersService.createUser(req.body);
    new APIResponse(201, 'User created successfully', user).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const getUsers = async (req, res, next) => {
  try {
    const { data, meta } = await usersService.getUsers(req.query, req);
    new APIResponse(200, 'Users fetched successfully', data, meta).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await usersService.getUserById(req.params.id);
    new APIResponse(200, 'User fetched successfully', user).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await usersService.updateUser(req.params.id, req.body);
    new APIResponse(200, 'User updated successfully', user).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await usersService.deleteUser(req.params.id);
    new APIResponse(200, 'User deleted successfully').send(res);
  } catch (error) {
    next(ApiError.handle(error));
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
