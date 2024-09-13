const express = require('express')
const { getReview, getAllReview } = require('../../Controller/admin/review.controller')
const { verifyToken } = require('../../helpers/verifyToken')
const reviewRoutes = express.Router()

reviewRoutes.get('/get-review',verifyToken,getReview)
reviewRoutes.get('/get-all-review',verifyToken, getAllReview)


module.exports = reviewRoutes