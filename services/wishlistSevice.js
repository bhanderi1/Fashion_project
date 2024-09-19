const Wishlist = require('../model/wishlist.model');
module.exports = class WishlistServices {
    addNeWishlist = async (body) => {
        return await Wishlist.create(body)
    }
    getWishlist = async (body) => {
        return await Wishlist.findOne(body)
    }
    getWishlistById = async (id) => {
        return await Wishlist.findById(id)
    }
    getWishlists = async (query) => {
        return await Wishlist.find(query)
    }
    updateWishlist = async (id, body) => {
        return await Wishlist.findByIdAndUpdate(id, { $set: body }, { new: true })
    }
    deleteWishlist = async(id) =>{
        return await Wishlist.findOneAndDelete(id);
    }
}