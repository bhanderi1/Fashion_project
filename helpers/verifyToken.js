const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

exports.verifyToken = async (req, res, next) => {
    try {
        let authorization = req.headers['authorization'];

        if (!authorization) {
            return res.status(401).json({ message: 'Not Authorizationed' });
        }
        let token = authorization.split(" ")[1];
        let { userId } = await jwt.verify(token, process.env.JWT_SECRATE);

        let user = await User.findOne({ _id: userId, isDelete: false });

        if (!user) {
            return res.status(404).json({ message: 'User not found or deleted' });
        }
        req.user = user;
        next();
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

