const express =require('express')
const admin= express.Router()

const adminRoutes = require('../../routes/admin/admin.routes')
const  productRoutes = require('../../routes/admin/product.routes')

admin.use('/user-data',adminRoutes)
admin.use('/product',productRoutes)

module.exports =  admin