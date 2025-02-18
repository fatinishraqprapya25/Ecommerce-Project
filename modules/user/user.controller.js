const path = require("path");
const bcrypt = require("bcrypt");
const userServices = require("./user.service");
const sendResponse = require("../../utils/sendResponse");
const config = require("../../config");
const sendEmail = require("../../utils/sendEmail");
const generateCode = require("../../utils/generateCode");

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

        if (userData.isVerified) delete userData.isVerified;
        if (userData.verificationCode) delete userData.
            verificationCode;

        const code = generateCode(6);
        const sentCode = await sendEmail();

        if (sentCode) {
            const newUser = await userServices.register(userData);
            return sendResponse(res, 201, {
                success: true,
                message: "User registered successfully",
                data: newUser
            });
        }

        sendResponse(res, 201, {
            success: false,
            message: "Error Occured sending verification code!",
        });

    } catch (err) {
        sendResponse(res, 400, {
            success: false,
            message: "Failed to register user",
            error: err
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


userController.updateUserInfo = async (req, res) => {
    try {
        const userId = req.user.id;
        const updateData = req.body;

        delete updateData.email;
        delete updateData.status;
        delete updateData.role;

        if (updateData.password) {
            const hashedPassword = await bcrypt.hash(updateData.password, config.bcryptCircle);
            updateData.password = hashedPassword;
        }

        const fileName = req.file ? req.file.path : null;
        if (fileName) {
            let filePath = path.join(__dirname, "../../", fileName);
            updateData.profile = filePath;
        }

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
