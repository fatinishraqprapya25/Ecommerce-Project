const Admin = require("./admin.model");

const adminService = {};

adminService.createAdmin = async (info) => {
    const result = await Admin.create(info);
    return result;
};

adminService.getAllAdmins = async () => {
    const result = await Admin.find({});
    return result;
};

adminService.findAdmin = async (id) => {
    const result = await Admin.findOneById(id);
    return result;
};

adminService.removeAdmin = async (adminId) => {
    const result = await Admin.findByIdAndUpdate(adminId, { isDeleted: true }, { new: true });
    return result;
};

adminService.disableUser = async (userId) => {
    return await User.findByIdAndUpdate(userId, { status: "disabled" });
}

adminService.enableUser = async (userId) => {
    return await User.findByIdAndUpdate(userId, { status: "active" });
}


module.exports = adminService;
