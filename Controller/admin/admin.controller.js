const jwt = require('jsonwebtoken')
const User = require('../../model/user.model')
const messages = require('../../helpers/messge')

exports.getUser = async(req,res)=>{
    try{
          let user = await User.findById({_id:req.query.userId,isDelete:false})
          if(!user){
            return res.json({message:messages.USER_NOT_FOUND})
          }
          res.json(user)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR })
    }
}

exports.getAllUser = async(req,res)=>{
    try{
         let user = await User.find({isDelete:false})
         res.json(user)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR })
    }
}

exports.signout = async(req,res) =>{
    try {
        const token = await jwt.sign({ userId: req.user._id }, process.env.JWT_SECRATE , {expiresIn:'5s'})
        console.log('user signed out');
        return res.status(200).json({ message:  messages.SIGN_OUT_SUCCESSFULLY, token })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR })
    }
}