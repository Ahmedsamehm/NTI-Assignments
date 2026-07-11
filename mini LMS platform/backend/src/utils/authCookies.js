const { generateToken, generateRefreshToken } = require('./get-jwt');

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  secure: false,
  sameSite: 'lax',
};

const setAuthCookies = (res, user) => {
  const accessToken = generateToken({
    _id: user._id,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    _id: user._id,
    role: user.role,
  });

  res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });

  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return {
    accessToken,
    refreshToken,
  };
};

module.exports = {
  setAuthCookies,
};
