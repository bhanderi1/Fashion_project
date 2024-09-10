const Cart = require('../../model/cart.model')

exports.addCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({
            user:req.user._id,
            productId:req.body.productId,
            isDelete:false,
        })
        if (cart) {
            return res.json({ message: "cart already exist..." })
        }
        cart = await Cart.create({
            user: req.user._id,
            ...req.body,
        })
        res.status(201).json({ message: 'Cart added', cart })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'internal server error' })
    }
}

// exports.updateCart= async(req,res)=>{
//     try{
//      let cart=await Cart.findOne({_id:req.query.cartId})
//      if(!cart){
//         return res.status(404).json({message: "cart not found..."})
//      }
//      let quantity = req.body.quantity+=cart.quantity
//      console.log(quantity)
//      cart=await Cart.findByIdAndDelete(cart._id,{$set:{...req.body},quantity},{new:true})
//      res.status(202).json({cart, message:'cart update successfully...'})
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).json({ message: 'internal server error' })
//       }
// }

exports.deleteCart = async(req,res)=>{
    try{
         let cart = await Cart.findOne({_id:req.query.cartId , isDelete:false})
         if(!cart){
            return res.status(404).json({message:"cart not found"})
         }
         cart = await Cart.findByIdAndUpdate(cart._id, {isDelete:true},{new:true})
         res.status(200).json({message:"cart delete succesfully..."})
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR })
      }
}

