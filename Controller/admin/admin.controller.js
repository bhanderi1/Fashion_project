const jwt = require('jsonwebtoken')
const User = require('../../model/user.model')

exports.getUser = async(req,res)=>{
    try{
          let user = await User.findById({_id:req.query.userId,isDelete:false})
          if(!user){
            return res.json({message:'User is not found..'})
          }
          res.json(user)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.getAllUser = async(req,res)=>{
    try{
         let user = await User.find({isDelete:false})
         res.json(user)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.signout = async(req,res) =>{
    try {
        const token = await jwt.sign({ userId: req.user._id }, process.env.JWT_SECRATE , {expiresIn:'5s'})
        console.log('user signed out');
        return res.status(200).json({ message: 'User Sign out successfully..', token })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' })
    }
}