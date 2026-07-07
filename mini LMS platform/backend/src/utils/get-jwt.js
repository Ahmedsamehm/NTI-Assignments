const jwt = require('jsonwebtoken');

const generateToken = (payload) =>
  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });

const generateRefreshToken = (payload) =>
  jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });

const verifyToken = (token) =>
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

const decodeToken = (token) => jwt.decode(token);

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  decodeToken,
};
