const User = require("./user.model");

const userServices = {};

userServices.createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
}

userServices.disableUser = async (userId) => {
    return await User.findByIdAndUpdate(userId, { status: "disabled" });
}

userServices.enableUser = async (userId) => {
    return await User.findByIdAndUpdate(userId, { status: "active" });
}

userServices.updateUserInfo = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
}

module.exports = userServices;