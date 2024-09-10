const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        unique:true,
    },
    description:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true,
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