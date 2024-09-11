const mongoose = require('mongoose')


const reviewSchema  = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:true,
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'product',
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    datePosted: {
        type: Date,
        default: Date.now,
    },
    isDelete:{
        type:Boolean,
        default:false
    }
}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model('review', reviewSchema)