const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:String
    },
    size:{
        type:String,
        // require:true,
        enum:['S','M','L','XL']
    },
    isDelete:{
        type:Boolean,
        default:false
    }
}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model('product', productSchema)