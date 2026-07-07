const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth-middleware');
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forget-password', authController.forgetPassword);
router.post('/verify-otp', authController.verifyOtpCode);
router.post('/reset-password', authController.resetPassword);
router.post('/refresh', authController.refresh_Token);
router.use(authMiddleware);
router.post('/logout', authController.logout);

module.exports = router;
