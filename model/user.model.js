const mongoose = require('mongoose')


const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            require: true
        },
        lastName: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        age:{
            type:Number
        },
        password: {
            type: String,
            require: true
        },
        Address:{
            type:String
        },
        role:{
            type:String,
            enum:['admin', 'user'],
            default:'user'
        },
        profileImage:{
            type:String,
        },
        isDelete: {
            type: Boolean,
            default: false
        }
    }, {
    versionKey: false,
    timestamps: true
}
)

module.exports = mongoose.model('user', userSchema)