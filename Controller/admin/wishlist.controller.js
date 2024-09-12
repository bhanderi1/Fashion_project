const Wishlist = require('../../model/wishlist.model'); 

exports.getWishlist = async (req, res) => {
    try{
          const wishlist = await Wishlist.find({isDelete:false})
          .populate("product", "title , description , price")
          .exec()
          res.json=(wishlist)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' })
    }
}


exports.getAllWishlist = async(req,res)=>{
  try{
    let wishlist = await Wishlist.findById({_id:req.query.wishlistId, isDelete:false})
    if (!wishlist) {
        return res.json({ message: "Wishlist not found..." })
    }
    res.json(cart)
  }catch (err) {
        res.status(400).json({ message: "Internal server Error" });
        console.log(err);
    }
}