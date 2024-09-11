const express =require('express')
const admin= express.Router()

const adminRoutes = require('../../routes/admin/admin.routes')
const  productRoutes = require('../../routes/admin/product.routes')
const cartRoutes = require('./cart.routes')
const orderRoutes = require('./order.routes')

admin.use('/user-data',adminRoutes)
admin.use('/product',productRoutes)
admin.use('/cart', cartRoutes)
admin.use('/order', orderRoutes)

module.exports =  admin