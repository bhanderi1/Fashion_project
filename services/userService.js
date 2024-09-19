const User = require('../model/user.model');

module.exports = class UserServices {
    addNewUser = async (body) => {
        return await User.create(body);
    }
    getUser = async (body) => {
        return await User.findOne(body)
    }
    getUserById = async (id) => {
        return await User.findById(id)
    }
    getUsers = async (query) => {
        return await User.find(query)
    }
    updateUser = async (id, body) => {
        return await User.findByIdAndUpdate(id, { $set: body }, { new: true });
    }
}