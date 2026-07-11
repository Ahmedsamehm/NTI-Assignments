const APIResponse = require('../utils/APIResponse');
const ApiError = require('../utils/ApiError');
const categoryService = require('../services/categories.service');

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getCategories({ ...req.query, req });
    new APIResponse(200, 'Categories fetched successfully', categories).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);
    new APIResponse(200, 'Category fetched successfully', category).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body);
    new APIResponse(201, 'Category created successfully', category).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await categoryService.updateCategory(id, req.body);
    new APIResponse(200, 'Category updated successfully', category).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    await categoryService.deleteCategory(id);
    new APIResponse(200, 'Category deleted successfully').send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
