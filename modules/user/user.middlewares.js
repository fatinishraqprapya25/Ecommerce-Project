const path = require("path");
const deleteUploadedFile = require("../../utils/deleteUploadedFile");
const upload = require("../../utils/upload");

const userMiddlewares = {};

userMiddlewares.uploader = (req, res, next) => {
    upload("profiles").single("avatar")(req, res, (err) => {
        if (err) {
            console.log(err);
            req.file = null
        }
        next();
    });
}

userMiddlewares.deteteUploadedPhotoIfValidationFailed = function (msg) {
    if (!msg.success) {
        if (msg.req.file) {
            const filePath = path.join(__dirname, "../../", msg.req.file.path);
            console.log(__dirname + "\n" + msg.req.file)
            deleteUploadedFile(filePath);
        }
    }
}

module.exports = userMiddlewares;