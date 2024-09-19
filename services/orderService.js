const Order = require('../model/order.model')
module.exports = class OrderServices {

    addNewOrder = async (body) => {
        return await Order.create(body)
    }
    getOrder = async (body) => {
        return await Order.findOne(body)
    }
    getOrderById = async (id) => {
        return await Order.findById(id)
    }
    getOrders = async(query) => {
        return await Order.find(query)
    }
    updateOrder= async(id, body) => {
        return await Order.findByIdAndUpdate(id, { $set: body }, { new: true });
    }
    updateMany = async(id , body) =>{
         return await Order.updateMany(id)
    }
}
