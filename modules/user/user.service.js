const User = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userServices = {};

userServices.register = async (userData) => {
    const user = new User(userData);
    return await user.save();
}

userServices.login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid email or password");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid email or password");

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return { token, user };
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