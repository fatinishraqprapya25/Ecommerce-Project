const sendResponse = require("../utils/sendResponse");
const jwt = require("jsonwebtoken");
const config = require("../config");
const Admin = require("../modules/admin/admin.model");

const checkAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return sendResponse(res, 403, {
                success: false,
                message: "access denied! token not provided.",
            });
        }

        const parts = token.split(" ");
        if (parts[0] !== "Bearer" || parts.length !== 2) {
            return sendResponse(res, 400, {
                success: false,
                message: "Invalid token format. Use 'Bearer <token>'",
            });
        }

        const authToken = parts[1];

        const user = jwt.verify(authToken, config.jwtSecret);
        const admin = await Admin.findById(user.id);
        if (!admin) {
            return sendResponse(res, 401, {
                success: false,
                message: "access denied!"
            });
        }

        req.user = user;
        next();
    } catch (err) {
        return sendResponse(res, 401, {
            success: false,
            message: "Invalid or expired token",
            error: err.message,
        });
    }
};

module.exports = checkAdmin;
