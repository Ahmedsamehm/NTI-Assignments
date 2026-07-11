const Category = require('../models/category.model');
const ApiError = require('../utils/ApiError');
const usePagination = require('../utils/usePagination');

const buildCategoryQueryAndSort = (queryParams) => {
  const { sort, order, ...filters } = queryParams;

  const query = {};

  if (filters.search) {
    query.name = {
      $regex: filters.search,
      $options: 'i',
    };
  }

  const sortOptions = {
    [sort || 'createdAt']: order === 'asc' ? 1 : -1,
  };

  return { query, sortOptions };
};

const getCategories = async (queryParams) => {
  const { req } = queryParams;
  const { query, sortOptions } = buildCategoryQueryAndSort(queryParams);

  const { data, meta } = await usePagination(req, Category, {
    query,
    sort: sortOptions,
  });

  return { data, meta };
};

const getCategoryById = async (id) => {
  const category = await Category.findById(id);
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }
  return category;
};

const createCategory = async (categoryData) => {
  const { name, description } = categoryData;
  if (!name) {
    throw new ApiError(400, 'Category name is required');
  }
  const category = await Category.create({ name, description });
  return category;
};

const updateCategory = async (id, updateData) => {
  const category = await Category.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  return category;
};

const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }
  return category;
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
