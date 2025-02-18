const sendResponse = require("../utils/sendResponse");
const { ZodError } = require("zod");

const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong";
    let errorDetails = null;

    if (error instanceof ZodError) {
        statusCode = 400;
        message = "Validation error";
        errorDetails = error.issues.map(issue => ({
            path: issue.path.join("."),
            message: issue.message
        }));
    } else if (error.name === "ValidationError") {
        statusCode = 400;
        message = error.message;
        errorDetails = error.errors;
    }

    sendResponse(res, statusCode, {
        success: false,
        message,
        error: errorDetails || error.message
    });
};

module.exports = globalErrorHandler;
