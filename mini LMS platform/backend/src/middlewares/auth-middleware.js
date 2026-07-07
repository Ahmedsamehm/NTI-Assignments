const ApiError = require('../utils/ApiError');
const { verifyToken } = require('../utils/get-jwt');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return next(new ApiError(401, 'Unauthorized'));
    }
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
    return next(new ApiError(401, 'Invalid or expired token'));
  }
};

module.exports = authMiddleware;
