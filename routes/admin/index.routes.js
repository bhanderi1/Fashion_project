const express = require('express')
const admin = express.Router()

const adminRoutes = require('../../routes/admin/admin.routes')
const productRoutes = require('../../routes/admin/product.routes')
const cartRoutes = require('../../routes/admin/cart.routes')
const orderRoutes = require('../../routes/admin/order.routes')
const wishlishRoutes = require('../../routes/admin/wishlist.routes')
const ReviewRouetes = require('../../routes/admin/review.routes')

admin.use('/user-data', adminRoutes)
admin.use('/product', productRoutes)
admin.use('/cart', cartRoutes)
admin.use('/order', orderRoutes)
admin.use('/wishlist', wishlishRoutes)
admin.use('/review',ReviewRouetes)

module.exports = admin