const express = require('express')
const cartRoutes = express.Router()
const { addCart, updateCart ,deleteCart} = require('../../Controller/user/cart.controller');
const { verifyToken } = require('../../helpers/verifyToken');


cartRoutes.post('/add-cart',verifyToken, addCart)
// cartRoutes.put('/update-cart',verifyToken, updateCart)
cartRoutes.delete('/delete-cart', deleteCart)


module.exports = cartRoutes;