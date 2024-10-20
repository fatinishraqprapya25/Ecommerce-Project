const User = require("../user/user.model");

const adminService = {};

adminService.createAdmin = async (email) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        existingUser.role = "admin";
        return await existingUser.save();
    } else {
        throw new Error("he must be a user!")
    }
};

adminService.getAllAdmins = async () => {
    return await User.find({ role: "admin" });
};

adminService.findAdminById = async (adminId) => {
    return await User.findById(adminId);
};

adminService.removeAdmin = async (adminId) => {
    return await User.findByIdAndUpdate(adminId, { role: "user" }, { new: true, runValidators: true });
};

module.exports = adminService;
