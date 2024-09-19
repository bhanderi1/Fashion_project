const Review = require('../model/review.model')
module.exports = class ReviewServices {

    addNewReview = async (body) => {
        return await Review.create(body)
    }
    getReview = async (body) => {
        return await Review.findOne(body)
    }
    getReviewById = async (id) => {
        return await Review.findById(id)
    }
    getReviews = async(query) => {
        return await Review.find(query)
    }
    updateReview= async(id, body) => {
        return await Review.findByIdAndUpdate(id, { $set: body }, { new: true });
    }
}
