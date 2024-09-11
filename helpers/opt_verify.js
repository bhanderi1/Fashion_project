const verifyOTP = (inputOtp, storedOtp, otpExpires) => {
    const isOtpValid = inputOtp === storedOtp;
    const isOtpExpired = Date.now() > otpExpires;

    return isOtpValid && !isOtpExpired;
};

module.exports = { verifyOTP };
