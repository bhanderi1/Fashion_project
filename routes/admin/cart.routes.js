const express = require('express')
const cartRoutes = express.Router()
const { getCart, getAllCart } = require('../../Controller/admin/cart.controller');
const { verifyToken } = require('../../helpers/verifyToken');

 cartRoutes.get('/get-cart',verifyToken, getCart )
 cartRoutes.get('/get-all-cart',verifyToken, getAllCart)


module.exports = cartRoutes;