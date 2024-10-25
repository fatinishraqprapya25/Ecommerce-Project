const User = require("../user/user.model");

const adminService = {};

adminService.createAdmin = async (email) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        existingUser.role = "admin";
        const result = await existingUser.save();
        delete result?.password;
        return result;
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

adminService.disableUser = async (userId) => {
    return await User.findByIdAndUpdate(userId, { status: "disabled" });
}

adminService.enableUser = async (userId) => {
    return await User.findByIdAndUpdate(userId, { status: "active" });
}


module.exports = adminService;
