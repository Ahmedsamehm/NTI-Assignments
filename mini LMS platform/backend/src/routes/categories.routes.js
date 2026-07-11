const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const { authorize } = require('../middlewares/role-middleware');
const Roles = require('../constants/roles');
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/categories.controller');

// Anyone logged in (Admin, Instructor, Student) can view categories
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

// Only Admins can modify categories (create, update, delete)
router.use(authMiddleware);
router.post('/', authorize(Roles.ADMIN), createCategory);
router.patch('/:id', authorize(Roles.ADMIN), updateCategory);
router.delete('/:id', authorize(Roles.ADMIN), deleteCategory);

module.exports = router;
