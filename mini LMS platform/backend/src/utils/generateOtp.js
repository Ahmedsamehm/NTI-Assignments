const crypto = require('crypto');
const bcrypt = require('bcrypt');

const generateOtp = async () => {
  const otp = crypto.randomInt(100000, 1000000).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);

  return {
    otp,
    hashedOtp,
  };
};
const verifyOtp = async (otp, hashedOtp) => {
  return await bcrypt.compare(otp, hashedOtp);
};

module.exports = { generateOtp, verifyOtp };
