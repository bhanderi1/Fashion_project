const express = require('express')
const adminRoutes = express.Router()
const { verifyToken } = require('../../helpers/verifyToken')
const { getUser, getAllUser,signout } = require('../../Controller/admin/admin.controller')


adminRoutes.get('/all-user' ,verifyToken, getAllUser)
adminRoutes.get('/get-user' ,verifyToken, getUser)
adminRoutes.post('/signout' ,verifyToken,signout )



module.exports = adminRoutes