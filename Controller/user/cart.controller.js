const Cart = require('../../model/cart.model')
const Product = require('../../model/product.model')

exports.addCart = async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const userId = req.user._id;

        let products = await Product.findById(product);

        if (!products) {
            return res.json({ message: "Product not found." });
        }
        let cart = await Cart.findOne({
            product: product,
            user: userId,
        });

        if (cart) {
            return res.json({ message: "Product is already available in your cart." });
        }

        cart = await Cart.create({
            product: product,
            user: userId,
            quantity: quantity,
            price: products.price 
        });

        res.json({ message: "Cart added successfully", cart });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getAllCart = async (req, res) => {
    try {
        let cart = await Cart.find({ user: req.user._id, isDelete: false })
        if(!cart){
            return res.json({message:"cart not found..."})
        }
        res.json(cart)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'internal server error' })
    }
}

exports.updateCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ _id: req.query.cartId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }
        let additionalQuantity = req.body.quantity || 1;
        let newQuantity = cart.quantity + additionalQuantity;

        cart = await Cart.findByIdAndUpdate(  cart._id,{ $set:{quantity: newQuantity}},{ new:true} );

        res.status(202).json({ cart, message: 'Cart updated successfully.' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'internal server error' })
    }
}

exports.deleteCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ _id:req.query.cartId, isDelete: false })
        if (!cart) {
            return res.status(404).json({ message: "cart not found" })
        }
        cart = await Cart.findByIdAndUpdate(cart._id, { isDelete: true }, { new: true })
        res.status(200).json({ message: "cart delete succesfully..." })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" })
    }
}

exports.updateShippingAddress = async(req,res) =>{
    try{
    
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" })
    }
}