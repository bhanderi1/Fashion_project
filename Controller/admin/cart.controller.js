const Cart = require('../../model/cart.model')
const messages = require('../../helpers/messge')

exports.getCart = async (req, res) => {
    try {
        let cart = await Cart.findById({_id:req.query.cartId, isDelete:false})
        if (!cart) {
            return res.json({ message: messages.CART_NOT_FOUND })
        }
        res.json(cart)
    }
    catch (err) {
        res.status(400).json({ message: messages.INTERNAL_SERVER_ERROR  });
        console.log(err);
    }
}

exports.getAllCart = async(req,res)=>{
    try{
        const cart = await Cart.find({isDelete:false})
        .populate("product", "title , description , price")
        .exec();
        res.json(cart)
    } catch (err) {
        res.status(400).json({ message: messages.INTERNAL_SERVER_ERROR  });
        console.log(err);
    }
}