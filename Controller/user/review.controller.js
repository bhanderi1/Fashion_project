const Product = require('../../model/product.model');
const Review = require('../../model/review.model');

exports.addReview = async (req, res) => {
    try {
        const { product, review, rating } = req.body;

        // Check if the product exists
        let existingProduct = await Product.findOne({ _id: product, isDelete: false });
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not available.' });
        }

        // Check if the user has already reviewed the product
        let existingReview = await Review.findOne({ product: product, user: req.user._id, isDelete: false });
        if (existingReview) {
            return res.status(400).json({ message: "You have already reviewed this product." });
        }

        // Create a new review
        const newReview = await Review.create({ user: req.user._id, product, review, rating });
        res.status(201).json({ message: "Review added successfully.", review: newReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
