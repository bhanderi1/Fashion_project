const express=require('express');
const { addWishlist, deleteWishlist } = require('../../Controller/user/wishlist.controller');
const { verifyToken } = require('../../helpers/verifyToken');
const wishlistRoutes=express.Router();

wishlistRoutes.post('/add-wishlist',verifyToken, addWishlist)
wishlistRoutes.delete('/delete-wishlist',verifyToken ,deleteWishlist)

module.exports=wishlistRoutes;