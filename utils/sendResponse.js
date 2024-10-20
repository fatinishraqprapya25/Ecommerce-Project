const sendResponse = (res, status, msg) => {
    res.status(status).json(msg);
}

module.exports = sendResponse;