const express = require('express')
const userRoutes = express.Router()
const { verifyToken } = require('../../helpers/verifyToken')
const { verifyUser } = require('../../helpers/verifyUser')
const { upload } = require('../../helpers/imageUpload')
const { signup, signIn, updateUser, userProfile, deleteUser, resetPassword, sigout, verifyOtpAndSignup } = require('../../Controller/user/user.controller')


userRoutes.post('/signup',upload.single('profileImage'), signup)
userRoutes.post('/verify-otp',verifyOtpAndSignup)
userRoutes.post('/signin', signIn)  //login
userRoutes.get('/user-profile', verifyToken, userProfile)
userRoutes.put('/update-user', verifyToken, updateUser)
userRoutes.put('/reset-password', verifyToken, resetPassword)
userRoutes.delete('/delete-user', verifyToken, deleteUser)
userRoutes.post('/signout', verifyToken, sigout)

module.exports = userRoutes