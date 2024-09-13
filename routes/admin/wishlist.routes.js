const express = require('express');
const { getWishlist, getAllWishlist } = require('../../Controller/admin/wishlist.controller');
const { verifyToken } = require('../../helpers/verifyToken');
const wishlistRoutes = express.Router();

wishlistRoutes.get('/get-wishlist', verifyToken, getWishlist)
wishlistRoutes.get('/get-all-wishlist', verifyToken, getAllWishlist)


module.exports = wishlistRoutes;