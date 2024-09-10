const express  = require('express')
const productRoutes = express.Router()
const { addProduct, updateProduct, deleteProduct } = require('../../Controller/admin/product.controller')
const { upload2 } = require('../../helpers/productImage')

productRoutes.post('/add-product',upload2.single('productImage') ,addProduct)
productRoutes.put('/update-product' ,updateProduct)
productRoutes.delete('/delete-product', deleteProduct)

module.exports = productRoutes