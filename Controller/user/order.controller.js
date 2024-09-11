const Cart = require('../../model/cart.model')
const Order = require('../../model/order.model')


exports.addNewOrder = async (req, res) => {
    try {
        const { city, district, village, road, homeNumber } = req.body

        let carts = await Cart.find({
            user: req.user._id,
            isDelete: false
        }).populate({ path: "product" })

        if (carts.length === 0) {
            return res.json({ message: "not found cart" })
        }

        let orderItems = carts.map((item) => ({
            productId: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
            totalprice: item.quantity * item.product.price
        }))
        console.log(orderItems);

        let amount = orderItems.reduce((total, item) => total += item.totalprice, 0)
        console.log(amount);

        let order = await Order.create({
            user: req.user._id,
            items: orderItems,
            subTotal: amount,
            deliveryAddress: {
                city: city,
                district: district,
                village: village,
                road: road,
                homeNumber: homeNumber
            }
        })

        await Cart.updateMany({ user: req.user._id, isDelete: false }, { isDelete: true })
        res.json({ message: "order places", order })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: " internal server error" })
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        let orderId = req.body._id
        if (!orderId) {
            return res.status(404).json({ message: "order not found..." })
        }
        res.status(200).json({ message: "order Delete Succesfully..." })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: " internal server error" })
    }
}
exports.updateDeliveryAddress = async (req, res) => {
    try {
        const { city, district, village, road, homeNumber } = req.body

        const order = await Order.find({ user: req.user._id, isDelete: false })

        if (!order) {
            return res.status(404).json({ message: "order not found..." })
        }

        order.deliveryAddress = {
            city: city,
            district: district,
            village: village,
            road: road,
            homeNumber: homeNumber
        }

        res.status(200).json({ order, message: 'delivery address updated successfully...' })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' })
    }
}