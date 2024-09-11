const express = require('express')
const cartRoutes = express.Router()
const { addCart ,deleteCart, getAllCart, updateCart} = require('../../Controller/user/cart.controller');
const { verifyToken } = require('../../helpers/verifyToken');


cartRoutes.post('/add-cart',verifyToken, addCart)
cartRoutes.get('/get-all-cart',verifyToken, getAllCart)
cartRoutes.put('/update-cart',verifyToken, updateCart)
cartRoutes.delete('/delete-cart', deleteCart)


module.exports = cartRoutes;