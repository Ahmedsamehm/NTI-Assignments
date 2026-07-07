const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
const { authorize } = require('../middlewares/role-middleware');
const Roles = require('../constants/roles');
const {
  createUser,
  getProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');
router.use(authMiddleware);

router.get('/me', getProfile);

router.post('/', authorize(Roles.ADMIN), createUser);

router.get('/', authorize(Roles.ADMIN), getUsers);

router.delete('/:id', authorize(Roles.ADMIN), deleteUser);

router.get(
  '/:id',
  authorize(Roles.ADMIN, Roles.INSTRUCTOR, Roles.STUDENT),
  getUserById
);

router.patch(
  '/:id',
  authorize(Roles.ADMIN, Roles.INSTRUCTOR, Roles.STUDENT),
  updateUser
);
module.exports = router;
