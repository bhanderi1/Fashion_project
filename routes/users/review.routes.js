const express = require('express')
const { addReview, otherReview, myReview, updateReview, deleteReview } = require('../../Controller/user/review.controller')
const { verifyToken } = require('../../helpers/verifyToken')
const reviewRoutes = express.Router()

reviewRoutes.post('/add-review',verifyToken, addReview)
reviewRoutes.get('/other-review',verifyToken, otherReview)
reviewRoutes.get('/my-review',verifyToken, myReview)
reviewRoutes.put('/update-review',verifyToken, updateReview)
reviewRoutes.delete('/delete-review',verifyToken, deleteReview)

module.exports = reviewRoutes