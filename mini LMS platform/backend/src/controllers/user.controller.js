const getProfile = async (req, res) => {
  res.status(200).json({ message: 'User profile handler', user: req.user });
};

module.exports = {
  getProfile,
};
