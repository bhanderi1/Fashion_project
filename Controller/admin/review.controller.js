const Review = require('../../model/review.model');
const messages = require('../../helpers/messge')

exports.getAllReview = async (req, res) => {
    try {
        const review = await Review.find({isDelete: false })
        res.status(200).json(review)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error:  messages.INTERNAL_SERVER_ERROR  });
    }
}

exports.getReview = async (req, res) => {
    try {
        const review = await Review.findOne({user: req.user._id,isDelete: false })
        if (!review) {
            return res.status(404).json({ error: messages.PRODUCT_NOT_FOUND });
        }
        res.status(200).json(review);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error:  messages.INTERNAL_SERVER_ERROR  });
    }
}
