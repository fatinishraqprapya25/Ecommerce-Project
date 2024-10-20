const sendResponse = require("../utils/sendResponse");

const notFoundHandler = (req, res, next) => {
    sendResponse(res, 404, {
        success: false,
        message: "Page not found"
    });
}

module.exports = notFoundHandler;