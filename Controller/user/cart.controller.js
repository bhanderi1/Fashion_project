const Cart = require('../../model/cart.model')
const Product = require('../../model/product.model')
const messages = require('../../helpers/messge')

exports.addCart = async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const userId = req.user._id;

        let products = await Product.findById(product);

        if (!products) {
            return res.json({ message: messages.PRODUCT_NOT_FOUND });
        }
        let cart = await Cart.findOne({
            product: product,
            user: userId,
        });

        if (cart) {
            return res.json({ message: messages.CART_ALREADY_EXIST });
        }

        cart = await Cart.create({
            product: product,
            user: userId,
            quantity: quantity,
            price: product.price
        });

        res.json({ message: messages.CART_ADDED, cart });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR });
    }
};


exports.getAllCart = async (req, res) => {
    try {
        let cart = await Cart.find({ user: req.user._id, isDelete: false })
        if (!cart) {
            return res.json({ message: messages.CART_NOT_FOUND })
        }
        res.json(cart)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR })
    }
}

exports.updateCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ _id: req.query.cartId, isDelete: false });

        if (!cart) {
            return res.status(404).json({ message: messages.CART_NOT_FOUND });
        }
        let additionalQuantity = req.body.quantity || 1;
        let newQuantity = cart.quantity + additionalQuantity;

        cart = await Cart.findByIdAndUpdate(cart._id, { $set: { quantity: newQuantity } }, { new: true });

        res.status(202).json({ cart, message: messages.CART_UPDATED });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR })
    }
}

exports.deleteCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ _id: req.query.cartId, isDelete: false })
        if (!cart) {
            return res.status(404).json({ message: messages.CART_NOT_FOUND })
        }
        cart = await Cart.findByIdAndUpdate(cart._id, { isDelete: true }, { new: true })
        res.status(200).json({ message: messages.CART_DELETE })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR })
    }
}

exports.updateShippingAddress = async (req, res) => {
    try {

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR })
    }
}