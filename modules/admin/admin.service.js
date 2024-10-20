const User = require("./user.model");

const adminService = {};

adminService.createAdmin = async (adminData) => {
    const existingUser = await User.findOne({ email: adminData.email });
    if (existingUser) {
        existingUser.role = "admin";
        return await existingUser.save();
    } else {
        const newAdmin = new User({ ...adminData, role: "admin" });
        return await newAdmin.save();
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
