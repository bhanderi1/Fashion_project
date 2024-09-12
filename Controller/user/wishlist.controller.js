const Product = require('../../model/product.model');
const Wishlist = require('../../model/wishlist.model'); // Capitalized for consistency

exports.addWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await Product.findOne({ _id: productId, isDelete: false });

        if (!product) {
            return res.status(404).json({ message: 'This item is not available' });
        }
        
        const existingWishlist = await Wishlist.findOne({ user:req.user._id, product: productId });

        if (existingWishlist) {
            return res.status(400).json({ message: 'Product is already in your wishlist' });
        }

        const wishlistItem = await Wishlist.create({ user: req.user._id, product: productId });
        res.status(201).json({ message: 'Product successfully added to wishlist', wishlistItem });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};

exports.deleteWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const wishlistItem = await Wishlist.findOneAndDelete({ user: req.user._id, product: productId });

        if (!wishlistItem) {
            return res.status(404).json({ message: 'Product not found in your wishlist' });
        }

        res.status(200).json({ message: 'Product successfully removed from wishlist' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};
