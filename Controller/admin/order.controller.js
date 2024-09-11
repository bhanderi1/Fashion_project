const Order = require('../../model/order.model')

exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById({_id:req.query.orderId, isDelete:false})
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ order: order })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
exports.getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find().populate('user')
        res.status(200).json({ orders: orders })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}