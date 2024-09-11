const express = require('express')
const user = express.Router()

const userRoutes = require('../../routes/users/user.routes')
const productRoutes = require('../../routes/users/product.routes')
const cartRoutes = require('../../routes/users/cart.routes')
const orderRoutes = require('../../routes/users/order.routes')
const reviewRoutes = require('../../routes/users/review.routes')
const  wishlistRoutes = require('../../routes/users/wishlist.routes')

user.use('/user', userRoutes)
user.use('/product', productRoutes)
user.use('/cart', cartRoutes)
user.use('/order',orderRoutes)
user.use('/wishlist', wishlistRoutes)
user.use('/review',reviewRoutes)

module.exports = user