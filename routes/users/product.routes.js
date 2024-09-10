const express = require("express")
const productRoutes = express.Router()
const { getAllProduct, getProduct } = require('../../Controller/user/product.controller')

productRoutes.get('/get-all-product' , getAllProduct)
productRoutes.get('/get-product', getProduct)

module.exports = productRoutes