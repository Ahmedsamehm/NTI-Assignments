const register = async (req, res) => {
  res.status(200).json({ message: 'Register handler' });
};

const login = async (req, res) => {
  res.status(200).json({ message: 'Login handler' });
};

module.exports = {
  register,
  login,
};
