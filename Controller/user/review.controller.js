const Product = require('../../model/product.model');
const Review = require('../../model/review.model');

exports.addReview = async (req, res) => {
    try {
        let { product, review, rating } = req.body;

        let existingProduct = await Product.findOne({ _id: product, isDelete: false });
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not available.' });
        }

        let existingReview = await Review.findOne({ product: product, user: req.user._id, isDelete: false });
        if (existingReview) {
            return res.status(400).json({ message: "You have already reviewed this product." });
        }

        const newReview = await Review.create({ user: req.user._id, product, review, rating });
        res.status(201).json({ message: "Review added successfully.", review: newReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.otherReview = async (req, res) => {
    try {
        const review = await Review.findOne({ isDelete: false })
        res.status(200).json(review)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.myReview = async (req, res) => {
    try {
        const review = await Review.findOne({ user: req.user._id, isDelete: false })
        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }
        res.status(200).json(review);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.updateReview = async (req, res) => {
    try {
        const id = req.params.id;
        let { review, rating } = req.body
        let reviews = await Review.findOne({ user: req.user._id, isDelete: false })

        if (!reviews) {
            return res.json({ message: "user has not any review yet" });
        }

        const upadteReview = await Review.findByIdAndUpdate(
            id,
            { review: review, rating: rating },
            { new: true }
        )
        if(!this.updateReview){
            return res.status(404).json({ error: "Review not found" });
        }
        res.status(202).json(upadteReview)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}