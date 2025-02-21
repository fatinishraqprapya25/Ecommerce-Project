const User = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userServices = {};

userServices.register = async (userData) => {
    const user = new User(userData);
    await user.save();
    const sanitizedUser = user.toObject();
    delete sanitizedUser.password;
    delete sanitizedUser.verificationCode;
    return sanitizedUser;
}

userServices.login = async ({ email, password }) => {
    const user = await User.findOne({ email, isVerified: true });
    if (!user) throw new Error("Invalid email or password");
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new Error("Invalid email or password");

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
    const sanitizedUser = user.toObject();
    delete sanitizedUser.password;
    delete sanitizedUser.verificationCode;

    return { token, user: sanitizedUser };
}

userServices.updateUserInfo = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
}

module.exports = userServices;