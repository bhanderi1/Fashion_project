const Product = require('../../model/product.model');
const Review = require('../../model/review.model');
const messages = require('../../helpers/messge')

const ProductServices = require('../../services/productService')
const productServices = new ProductServices()
const ReviewServices = require('../../services/reviewService')
const reviewServices = new ReviewServices()

exports.addReview = async (req, res) => {
    try {
        let { product, review, rating } = req.body;

        let existingProduct = await productServices.getProduct({ _id: product, isDelete: false });
        if (!existingProduct) {
            return res.status(404).json({ message: messages.PRODUCT_NOT_FOUND });
        }
        let existingReview = await Review.findOne({ product: product, user: req.user._id, isDelete: false });
        if (existingReview) {
            return res.status(400).json({ message: messages.ALREADY_REVIEW_PRODUCT});
        }
        const newReview = await reviewServices.addNewReview({ user: req.user._id, product, review, rating });
        res.status(201).json({ message: messages.REVIEW_ADDED, review: newReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message:  messages.INTERNAL_SERVER_ERROR });
    }
};


exports.otherReview = async (req, res) => {
    try {
        const review = await reviewServices.getReviews({ isDelete: false })
        res.status(200).json(review)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message:  messages.INTERNAL_SERVER_ERROR });
    }
}

exports.myReview = async (req, res) => {
    try {
        const review = await reviewServices.getReview({ user: req.user._id, isDelete: false })
        if (!review) {
            return res.status(404).json({ message: messages.REVIEW_NOT_FOUND });
        }
        res.status(200).json(review);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message:  messages.INTERNAL_SERVER_ERROR });
    }
}

exports.updateReview = async (req, res) => {
    try {
        const { reviewId } = req.query;
        let review = await reviewServices.getReview({ _id: reviewId, isDelete: false });
        if (!review) {
            return res.status(404).json({ message: messages.PRODUCT_NOT_FOUND  });
        }
        review = await Review.findByIdAndUpdate(reviewId, { $set: { ...req.body } }, { new: true });
        res.status(202).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message:  messages.INTERNAL_SERVER_ERROR });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        let review = await reviewServices.getReview({ reviewId: req.query._Id, isDelete: false });
        if (!review) {
            return res.status(404).json({ message:  messages.PRODUCT_NOT_FOUND  });
        }
        await Review.findByIdAndUpdate(review._id, { isDelete: true }, { new: true });

        return res.status(200).json({ message:  messages.REVIEW_DELETE});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message:  messages.INTERNAL_SERVER_ERROR });
    }
};

