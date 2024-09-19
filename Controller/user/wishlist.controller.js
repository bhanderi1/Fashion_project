const Product = require('../../model/product.model');
const Wishlist = require('../../model/wishlist.model'); // Capitalized for consistency
const messages = require('../../helpers/messge')

const WishlistServices = require('../../services/wishlistSevice')
const wishlistService = new WishlistServices()
const ProductServices = require('../../services/productService')
const productServices = new ProductServices()


exports.addWishlist = async (req, res) => {
    try {
        let { product } = req.body; 
        let userId = req.user._id;

        let productExists = await productServices.getProductById(product);
        if (!productExists) {
            return res.status(404).json({ message:  messages.PRODUCT_NOT_FOUND });
        }

        let wishlistItem = await wishlistService.getWishlist({
            product: product,
            user: userId,
        });

        if (wishlistItem) {
            return res.status(400).json({ message: messages.PRODUCT_ALREADY_EXIST });
        }
        wishlistItem = await wishlistService.addNeWishlist({
            product: product,
            user: userId,
            ...req.body
        });

        return res.status(200).json({ message: messages.PRODUCT_ADDE_WISHLIST, wishlistItem });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message:  messages.INTERNAL_SERVER_ERROR  });
    }
};


exports.deleteWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const wishlistItem = await wishlistService.deleteWishlist({ user:req.user._id, product: productId });

        if (!wishlistItem) {
            return res.status(404).json({ message:messages.PRODUCT_NOT_FOUND_WISHLIST });
        }

        res.status(200).json({ message: messages.PRODUCT_DELETE_WISHLIST});
    } catch (error) {
        res.status(500).json({ message:  messages.INTERNAL_SERVER_ERROR  });
    }
};


