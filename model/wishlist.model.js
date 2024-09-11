const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'users'
     },
     product:{
         type:mongoose.Schema.ObjectId,
         ref:'products'
     },
     isDelete:{
      type:Boolean,
      default:false
     }
})
module.exports =  mongoose.model('wishlist', wishlistSchema)