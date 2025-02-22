const sendResponse = require("../../utils/sendResponse");
const adminService = require("./admin.service");
const User = require("../user/user.model.js");
const Traffic = require("../../utils/saveTrafficData.js");

const adminController = {};

adminController.createAdmin = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        const info = {};
        info.addedBy = req.admin._id;
        info.user = user._id;
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

adminController.getTodaysTraffic = async (req, res) => {
    try {
        const today = new Date().toISOString().split("T")[0];
        const traffic = await Traffic.countDocuments({
            date: today
        });

        sendResponse(200, {
            success: true,
            message: "Today's traffic retrieved successfully!",
            data: traffic
        });
    } catch (err) {
        sendResponse(500, {
            success: false,
            message: err.message,
            error: err
        });
    }
}

adminController.getThisMonthsTraffic = async (req, res) => {
    try {
        const today = new Date(Date.now());
        const yearMonth = new Date(today).toISOString().split("T")[0];
        const traffic = await Traffic.countDocuments({
            date: { $gte: `${yearMonth}-01`, $lte: `${yearMonth}-31` }
        });
        sendResponse(200, {
            success: true,
            message: "This months traffic retrieved successfully!",
            data: traffic
        });
    } catch (err) {
        sendResponse(500, {
            success: false,
            message: "failed to fetch traffic of this months",
            error: err
        });
    }
}

// adminController.getThisYearsTraffic = async (req, res) => {
//     try { }
// }

module.exports = adminController;
