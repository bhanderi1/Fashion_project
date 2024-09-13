const User = require('../../model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { sendOtpEmail } = require('../../helpers/nodemailer')
const { generateOTP, otpExpiresIn } = require('../../helpers/opt_genreator')
const messages = require('../../helpers/messge')

exports.signup = async (req, res) => {
    try {
        let { firstName, lastName, email, password, role, profileImage } = req.body;
        let user = await User.findOne({ email: email, isDelete: false });
        if (user) {
            return res.status(400).json({ message: messages.USER_ALREADY_EXIST  });
        }

        const otp = generateOTP();
        const otpExpires = otpExpiresIn();

        let imagePath = "";
        if (req.file) {
            imagePath = req.file.path.replace(/\\/g, "/");
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const hashotp = await bcrypt.hash(otp, 10);
        console.log(hashotp)
        await sendOtpEmail(email, otp);

        user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role,
            password: hashPassword,
            profileImage: imagePath,
            otp: hashotp,
            otpExpires
        });

        res.status(201).json({ message: messages.SEND_OTP });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR  });
    }
};

exports.verifyOtpAndSignup = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email, isDelete: false });
        if (!user) {
            return res.status(404).json({ message:  messages.USER_NOT_FOUND});
        }
        const compareOtp = await bcrypt.compare(req.body.otp, user.otp)
        // console.log(compareOtp)

        const currentTime = new Date();
        if (!compareOtp || user.otpExpires < currentTime) {
            return res.status(400).json({ message: messages.INVALID_OTP });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRATE);
        console.log(token);

        res.status(200).json({ message: messages.USER_REGISTER_SUCCESSFULLY, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR  });
    }
};

exports.signIn = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, isDelete: false })
        if (!user) {
            return res.json({ message:  messages.USER_NOT_FOUND })
        }
        let comparePassword = await bcrypt.compare(req.body.password, user.password)
        if (!comparePassword) {
            return res.json({ message: messages.EMAIL_PASSWORS_NOT_MATCHED })
        }
        let token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRATE)
        console.log(token)
        res.status(200).json({ message: messages.LOGIN_SUCESSDFULLY , token })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR  })
    }
}

exports.userProfile = async (req, res) => {
    try {
        let user = await User.findOne({ _id:req.user._id })
        res.status(200).json({ message: messages.SHOW_USER_PROFILE, user })
        //   res.json(req.user)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR  })
    }
}


exports.resetPassword = async (req, res) => {
    try {
        let user = req.user
        user = await User.findById(req.user._id)
        if (!user) {
            return res.status(404).json({ message:  messages.USER_NOT_FOUND })
        }
        let { oldPassword, newPassword, confirmPassword } = req.body
        const compareOldPassword = await bcrypt.compare(oldPassword, user.password)
        if (!compareOldPassword)
            return res.status(400).json({ message:messages.ENTER_VALID_PASSWORD })

        if (oldPassword === newPassword) {
            return res.status(400).json({ message:messages.OLD_AND_NEW_PASSWORD_NOT_MATCH })
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message:messages.NEW_AND_CONFIRM_PASSWORD_NOT_MATCH  })
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10)
        user = await User.findByIdAndUpdate(req.user._id, { password: hashedNewPassword })
        res.status(200).json({ message: messages.PASSWORD_UPDATE_SUCCESSFULLY, user })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR  })
    }
}

exports.updateUser = async (req, res) => {
    try {
        let user = req.user
        user = await User.findByIdAndUpdate(user._id, { $set: { ...req.body } }, { new: true })
        res.status(200).json({ user, message:messages.PASSWORD_UPDATE_SUCCESSFULLY });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR  })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        let user = req.user
        if (!user) {
            return res.status(404).json({ message:  messages.USER_NOT_FOUND })
        }
        user = await User.findByIdAndUpdate(user._id, { isDelete: true }, { new: true })
        res.status(200).json({ message: messages.USER_DELETE_SUCCESSFULLY })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR  })
    }
}

exports.sigout = async (req, res) => {
    try {
        const token = await jwt.sign({ userId: req.user._id }, process.env.JWT_SECRATE)
        console.log('user signed out');
        return res.status(200).json({ message: messages.SIGN_OUT_SUCCESSFULLY, token })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR  })
    }
}