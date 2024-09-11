const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'product'
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user'
    },
    quantity:{
        type:Number,
        default:1
    },
    isDelete:{
        type:Boolean,
        default:false
    },
}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model('cart',cartSchema)