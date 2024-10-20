const path = require("path");
const userServices = require("./user.service");
const sendResponse = require("../../utils/sendResponse");

const userController = {};

userController.register = async (req, res) => {
    try {
        const userData = req.body;
        const fileName = req.file ? req.file.path : null;
        let filePath;
        if (fileName === null) {
            filePath = path.join(__dirname, "../../uploads/profile", "avatar.jpg");
        } else {
            filePath = path.join(__dirname, "../../", fileName);
        }
        userData.profile = filePath;
        const newUser = await userServices.register(userData);
        sendResponse(res, 201, {
            success: true,
            message: "User registered successfully",
            data: newUser
        });
    } catch (err) {
        sendResponse(res, 400, {
            success: false,
            message: "Failed to register user",
            error: err.message
        });
    }
};

userController.login = async (req, res) => {
    try {
        const userInfo = req.body;
        const { token, user } = await userServices.login(userInfo);

        sendResponse(res, 200, {
            success: true,
            message: "Login successful",
            token,
            data: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        sendResponse(res, 401, {
            success: false,
            message: "Login failed",
            error: err.message
        });
    }
};

userController.disableUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const disabledUser = await userServices.disableUser(userId);
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

userController.enableUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const enabledUser = await userServices.enableUser(userId);
        if (!enabledUser) {
            return sendResponse(res, 404, { success: false, message: "User not found" });
        }
        sendResponse(res, 200, { success: true, message: "User enabled successfully" });
    } catch (err) {
        sendResponse(res, 500, { success: false, message: "Error enabling user", error: err.message });
    }
};

userController.updateUserInfo = async (req, res) => {
    try {
        const userId = req.user.id;
        const updateData = req.body;
        const updatedUser = await userServices.updateUserInfo(userId, updateData);
        if (!updatedUser) {
            return sendResponse(res, 404, { success: false, message: "User not found" });
        }
        sendResponse(res, 200, {
            success: true,
            message: "user information updated successfully",
            data: updatedUser
        });
    } catch (err) {
        sendResponse(res, 400, { success: false, message: "Error updating user information", error: err.message });
    }
};

module.exports = userController;
