const sendResponse = require("../utils/sendResponse")

const globalErrorHandler = (error, req, res, next) => {
    sendResponse(res, 500, {
        success: false,
        message: error.message,
        error: error
    });
}

module.exports = globalErrorHandler;