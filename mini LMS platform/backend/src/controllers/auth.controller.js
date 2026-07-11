const ApiError = require('../utils/ApiError');
const APIResponse = require('../utils/APIResponse');
const { setAuthCookies } = require('../utils/authCookies');
const authService = require('../services/auth.service');

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    new APIResponse(201, 'User registered successfully', user).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const login = async (req, res, next) => {
  try {
    const user = await authService.login(req.body);
    setAuthCookies(res, user);
    new APIResponse(200, 'Login successful', user).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    new APIResponse(200, 'Logout successful', {}).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const refresh_Token = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const { accessToken, _id, role } = await authService.refreshToken(refreshToken);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });

    new APIResponse(200, 'Refresh token successful', { _id, role }).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    const { otp } = await authService.forgetPassword(req.body);
    new APIResponse(200, 'OTP sent successfully', { otp }).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const verifyOtpCode = async (req, res, next) => {
  try {
    await authService.verifyOtpCode(req.body);
    new APIResponse(200, 'OTP verified successfully').send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

const resetPassword = async (req, res, next) => {
  try {
    await authService.resetPassword(req.body);
    new APIResponse(200, 'Password reset successful', {}).send(res);
  } catch (error) {
    next(ApiError.handle(error));
  }
};

module.exports = {
  register,
  login,
  logout,
  refresh_Token,
  forgetPassword,
  verifyOtpCode,
  resetPassword,
};
