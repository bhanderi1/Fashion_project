const express = require('express')
const user = express.Router()

const userRoutes = require('../../routes/users/user.routes')
const productRoutes = require('../../routes/users/product.routes')
const cartRoutes = require('../../routes/users/cart.routes')


user.use('/user', userRoutes)
user.use('/product', productRoutes)
user.use('/cart', cartRoutes)


module.exports = user