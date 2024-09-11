const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS 
    }
});

const sendOtpEmail = (to, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to:"sqsrustibhanderi@gmail.com",  //to:to,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It will expire in 10 minutes.`
    };

    return transporter.sendMail(mailOptions);
};
console.log('Email sent');

module.exports = { sendOtpEmail };
