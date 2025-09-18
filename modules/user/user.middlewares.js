const path = require("path");
const deleteUploadedFile = require("../../utils/deleteUploadedFile");
const upload = require("../../utils/upload");

const userMiddlewares = {};

userMiddlewares.uploader = (req, res, next) => {
    const fileTypes = /jpeg|jpg|png/;
    upload("profiles", 10, fileTypes).single("avatar")(req, res, (err) => {
        if (err) {
            req.file = null
        }
        next();
    });
}

userMiddlewares.deteteUploadedPhotoIfValidationFailed = function (msg) {
    if (!msg.success) {
        
    }
}

module.exports = userMiddlewares;