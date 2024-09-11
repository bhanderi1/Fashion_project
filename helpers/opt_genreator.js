const crypto = require('crypto');

const generateOTP = () => {
    return crypto.randomInt(1000, 9999).toString(); 
};

const otpExpiresIn = () => {
    return Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
};

module.exports = { generateOTP, otpExpiresIn };
