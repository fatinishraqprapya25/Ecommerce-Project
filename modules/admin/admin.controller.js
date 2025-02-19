const sendResponse = require("../../utils/sendResponse");
const adminService = require("./admin.service");
const orderService = require("../order/order.service");

const adminController = {};

adminController.createAdmin = async (req, res) => {
    try {
        const info = req.body;
        const admin = await adminService.createAdmin(info);
        sendResponse(res, 201, {
            success: true,
            message: "Admin created successfully",
            data: admin
        });
    } catch (err) {
        sendResponse(res, 400, {
            success: false,
            message: "Failed to create admin",
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

adminController.findAdmin = async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await adminService.findAdmin(adminId);
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

adminController.disableUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const disabledUser = await adminService.disableUser(userId);
        if (!disabledUser) {
            return sendResponse(res, 404, { success: false, message: "User not found" });
        }
        sendResponse(res, 200, {
            success: true,
            message: "User disabled successfully",
            data: disabledUser
        });
    } catch (err) {
        sendResponse(res, 500, { success: false, message: "Error disabling user", error: err.message });
    }
};

adminController.enableUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const enabledUser = await adminService.enableUser(userId);
        if (!enabledUser) {
            return sendResponse(res, 404, { success: false, message: "User not found" });
        }
        sendResponse(res, 200, { success: true, message: "User enabled successfully", data: enabledUser });
    } catch (err) {
        sendResponse(res, 500, { success: false, message: "Error enabling user", error: err.message });
    }
};

module.exports = adminController;
