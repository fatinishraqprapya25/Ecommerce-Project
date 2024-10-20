const sendResponse = require("../../utils/sendResponse");
const adminService = require("./admin.service");

const adminController = {};

adminController.createAdmin = async (req, res) => {
    try {
        const adminData = req.body;
        const admin = await adminService.createAdmin(adminData);
        sendResponse(res, 201, {
            success: true,
            message: "Admin created successfully",
            data: admin
        });
    } catch (err) {
        sendResponse(res, 400, {
            success: false,
            message: "Failed to create or update admin",
            error: err.message
        });
    }
};

adminController.getAllAdmins = async (req, res) => {
    try {
        const admins = await adminService.getAllAdmins();
        sendResponse(res, 200, {
            success: true,
            message: "Admins retrieved successfully",
            data: admins
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Error retrieving admins",
            error: err.message
        });
    }
};

adminController.findAdminById = async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await adminService.findAdminById(adminId);
        if (!admin) {
            return sendResponse(res, 404, {
                success: false,
                message: "Admin not found"
            });
        }
        sendResponse(res, 200, {
            success: true,
            message: "Admin retrieved successfully",
            data: admin
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Error retrieving admin",
            error: err.message
        });
    }
};

adminController.removeAdmin = async (req, res) => {
    try {
        const adminId = req.params.id;
        const removedAdmin = await adminService.removeAdmin(adminId);
        if (!removedAdmin) {
            return sendResponse(res, 404, {
                success: false,
                message: "Admin not found"
            });
        }
        sendResponse(res, 200, {
            success: true,
            message: "Admin removed successfully",
            data: removedAdmin
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Error removing admin",
            error: err.message
        });
    }
};

module.exports = adminController;
