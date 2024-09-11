const express = require('express')
const { addReview } = require('../../Controller/user/review.controller')
const { verifyToken } = require('../../helpers/verifyToken')
const reviewRoutes = express.Router()

reviewRoutes.post('/add-review',verifyToken, addReview)

module.exports = reviewRoutes