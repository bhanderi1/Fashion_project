const User = require('../../model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, profileImage, role } = req.body
        let imagePath = " "
        let user = await User.findOne({ email: email, isDelete: false })
        if (user) {
            return res.json({ message: 'user already Register.' })
        }
        if (req.file) {
            imagePath = req.file.path.replace(/\\/g, "/")
        }
        let hashPassword = await bcrypt.hash(password, 10)
        user = await User.create({ firstName: firstName, lastName: lastName, email: email, password: hashPassword, profileImage: imagePath, role: role })
        res.status(201).json({ user, message: 'user Signup successfullly...' })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await User.findOne({ email: email, isDelete: false })
        if (!user) {
            return rea.json({ message: 'User Not found...' })
        }
        let comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.json({ message: 'Email or password does not matched...' })
        }
        let token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRATE)
        console.log(token)
        res.status(200).json({ message: "Login Sucess...", token })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.userProfile = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.user._id })
        res.status(200).json({ message: "Show user profile", user })
        //   res.json(req.user)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' })
    }
}


exports.resetPassword = async (req, res) => {
    try {
        let user = req.user
        user = await User.findById(req.user._id)
        if (!user) {
            return res.status(404).json({ message: "user not found..." })
        }
        let { oldPassword, newPassword, confirmPassword } = req.body
        const compareOldPassword = await bcrypt.compare(oldPassword, user.password)
        if (!compareOldPassword)
            return res.status(400).json({ message: "Please enter valid Password" })

        if (oldPassword === newPassword) {
            return res.status(400).json({ message: "old password and new password both are the same, please eneter valid password" })
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "new password and confirm password do not match" })
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10)
        user = await User.findByIdAndUpdate(req.user._id, { password: hashedNewPassword })
        res.status(200).json({ message: "Password updated successfully!", user })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.updateUser = async (req, res) => {
    try {
        let user = req.user
        user = await User.findByIdAndUpdate(user._id, { $set: { ...req.body } }, { new: true })
        res.status(200).json({ user, message: "User is Updated" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        let user = req.user
        if (!user) {
            return res.status(404).json({ message: "user Not Found..." })
        }
        user = await User.findByIdAndUpdate(user._id, { isDelete: true }, { new: true })
        res.status(200).json({ message: 'user Delete Successfully...' })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.sigout = async (req, res) => {
    try {
        const token = await jwt.sign({ userId: req.user._id }, process.env.JWT_SECRATE)
        console.log('user signed out');
        return res.status(200).json({ message: 'User Sign out successfully..', token })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' })
    }
}