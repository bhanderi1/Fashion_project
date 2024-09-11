const express = require('express')
const orderRoutes = express.Router()

const { verifyToken } = require('../../helpers/verifyToken')
const { addNewOrder, deleteOrder, updateDeliveryAddress } = require('../../Controller/user/order.controller')

orderRoutes.post('/add-order', verifyToken, addNewOrder)
orderRoutes.put('/new-address', verifyToken, updateDeliveryAddress)
orderRoutes.delete('/delete-order',verifyToken,deleteOrder)
module.exports= orderRoutes