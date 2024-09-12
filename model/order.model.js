const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ef:'user',
        required:true,
    },
    items:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'product'
        },
        quantity:{
            type:Number,
            // default:1,
        },
        totalprice:{
            type:Number,
        }
    }],
    subTotal:{
        type:Number,
        // required:true
    },
    deliveryAddress: {
        city: {
          type: String,
        //   required: true,
        },
        district: {
          type: String,
        //   required: true,
        },
        vilage:{
            type:String,
            // required:true,
        },
        road:{
            type:String,
            // require:true
        },
        homeNumber:{
            type:String,
            // require:true
        }
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
}, {
    versionKey: false,
    timestamps: true
})

module.exports =mongoose.model('order', orderSchema)