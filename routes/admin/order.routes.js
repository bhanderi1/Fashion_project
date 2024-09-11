const express = require("express");
const { getAllOrder, getOrder } = require("../../Controller/admin/order.controller");
const orderRoutes = express.Router();

orderRoutes.get("/get-order",getOrder)
orderRoutes.get("/get-all-order",getAllOrder)

module.exports = orderRoutes