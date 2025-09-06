const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userServices = require("./user.service");
const sendResponse = require("../../utils/sendResponse");
const config = require("../../config");
const sendEmail = require("../../utils/sendEmail");
const generateCode = require("../../utils/generateCode");
const User = require("./user.model");

const userController = {};

userController.register = async (req, res) => {
    try {
        const userData = req.body;
        const { email } = userData;
        const emailRegistered = await User.findOne({ email });
        if (emailRegistered) {
            sendResponse(res, 500, {
                success: false,
                message: "Email is already registered!"
            });
        }
        const fileName = req.file ? req.file.path : null;
        let filePath;
        if (fileName === null) {
            filePath = path.join(process.cwd(), "uploads/profile", "avatar.jpg");
        } else {
            filePath = path.join(__dirname, "../../", fileName);
        }
        userData.profile = filePath;

        if (userData.isVerified) delete userData.isVerified;
        if (userData.verificationCode) delete userData.
            verificationCode;

        const code = generateCode(6);
        const mailDetails = {
            from: config.email,
            to: userData.email,
            subject: "Verify Your Email",
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
                    <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
                        <h2 style="color: #333; margin-bottom: 10px;">Email Verification</h2>
                        <p style="font-size: 16px; color: #555; margin-bottom: 10px;">Hello,</p>
                        <p style="font-size: 16px; color: #555; margin-bottom: 20px;">Use the following code to verify your email address:</p>
                        <p style="font-size: 22px; font-weight: bold; color: #2d89ef; background: #eaf2ff; padding: 10px 20px; display: inline-block; border-radius: 5px;">${code}</p>
                        <p style="font-size: 14px; color: #555; margin-top: 20px;">This code is valid for 10 minutes.</p>
                        <p style="font-size: 14px; color: #888; margin-top: 20px;">If you didn’t request this, you can ignore this email.</p>
                    </div>
                </div>
            `
        };
        const sentCode = await sendEmail(mailDetails);
        console.log(sentCode);

        if (sentCode) {
            userData.verificationCode = jwt.sign({ code }, config.jwtSecret, { expiresIn: "2m" });
            const newUser = await userServices.register(userData);
            return sendResponse(res, 201, {
                success: true,
                message: "User registered successfully. we sent a varification code to your email, please verify it!",
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

userController.verifyCode = async ({ code, email }) => {
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error("Email is not registered yet!");
        const decoded = jwt.verify(user.verificationCode, config.jwtSecret);
        if (decoded.code === parseInt(code)) {
            return user;
        }
        return false;
    } catch (err) {
        throw new Error(err.message);
    }
}

userController.verifyUser = async (req, res) => {
    try {
        const info = req.body;
        const user = await userController.verifyCode(info);
        if (user) {
            user.isVerified = true;
            const result = await user.save();
            const sanitizedUser = result.toObject();
            if (sanitizedUser.password) delete sanitizedUser.password;
            if (sanitizedUser.verificationCode) delete sanitizedUser.verificationCode;
            return sendResponse(res, 200, {
                success: true,
                message: "user verified successfully! please login...",
                data: sanitizedUser
            });
        }
        sendResponse(res, 500, {
            success: false,
            message: "invalid code",
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: err.message,
            error: err
        });
    }
}

userController.sendCodeToResetPass = async (req, res) => {
    try {
        const { email } = req.body;
        const code = generateCode(6);
        const mailInfo = {
            from: config.email,
            to: email,
            subject: "Verify Your Email",
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
                    <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
                        <h2 style="color: #333; margin-bottom: 10px;">Email Verification</h2>
                        <p style="font-size: 16px; color: #555; margin-bottom: 10px;">Hello,</p>
                        <p style="font-size: 16px; color: #555; margin-bottom: 20px;">Use the following code to verify your email address:</p>
                        <p style="font-size: 22px; font-weight: bold; color: #2d89ef; background: #eaf2ff; padding: 10px 20px; display: inline-block; border-radius: 5px;">${code}</p>
                        <p style="font-size: 14px; color: #555; margin-top: 20px;">This code is valid for 10 minutes.</p>
                        <p style="font-size: 14px; color: #888; margin-top: 20px;">If you didn’t request this, you can ignore this email.</p>
                    </div>
                </div>
            `
        };
        const sentCode = await sendEmail(mailInfo);
        if (sentCode) {
            const user = await User.findOne({ email });
            user.verificationCode = jwt.sign({ code }, config.jwtSecret, { expiresIn: "2m" });
            await user.save();
            return sendResponse(res, 200, {
                success: true,
                message: "a code sent to your email, verify it to reset password..."
            });
        }
        sendResponse(res, 500, {
            success: false,
            message: "failed to send code to reset password!"
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: err.message,
            error: err
        });
    }
}

userController.resetPass = async (req, res) => {
    try {
        const { code, email, password } = req.body;
        const user = await userController.verifyCode({ code, email });
        if (user) {
            user.password = password;
            const result = await user.save();
            const sanitizedUser = result.toObject();
            if (sanitizedUser.password) delete sanitizedUser.password;
            if (sanitizedUser.verificationCode) delete sanitizedUser.verificationCode;
            return sendResponse(res, 200, {
                success: true,
                message: "password reset successfully! please login...",
                data: sanitizedUser
            });
        }
        sendResponse(res, 500, {
            success: false,
            message: "invalid code!",
        })
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: err.message,
            error: err
        });
    }
}

userController.login = async (req, res) => {
    try {
        const userInfo = req.body;
        const { token, user } = await userServices.login(userInfo);

        sendResponse(res, 200, {
            success: true,
            message: "Login successful",
            token,
            data: user
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
