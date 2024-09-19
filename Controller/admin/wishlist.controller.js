const Wishlist = require('../../model/wishlist.model'); 
const messages = require('../../helpers/messge')

const WishlistServices = require('../../services/wishlistSevice')
const wishlistService = new WishlistServices()

exports.getWishlist = async (req, res) => {
    try{
        let wishlist = await wishlistService.getWishlistById({_id:req.query.wishlistId, isDelete:false})
        if (!wishlist) {
            return res.json({ message: messages.WISHLIST_NOT_FOUND})
        }
        res.json(wishlist)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message:  messages.INTERNAL_SERVER_ERROR  })
    }
}


exports.getAllWishlist = async(req,res)=>{
  try{ 
    const wishlist = await Wishlist.find({isDelete:false})
    .populate("product", "title , description , price")
    .exec()
    res.json(wishlist)
  }catch (err) {
        res.status(400).json({ message:  messages.INTERNAL_SERVER_ERROR  });
        console.log(err);
    }
}