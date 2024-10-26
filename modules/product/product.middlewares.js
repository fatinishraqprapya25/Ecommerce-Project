const path = require("path");
const deleteUploadedFile = require("../../utils/deleteUploadedFile");
const upload = require("../../utils/upload");

const productMiddlewares = {};

productMiddlewares.deteteUploadedPhotoIfValidationFailed = function (msg) {
    if (!msg.success) {
        if (msg.req.files) {
            msg.req.files.map(file => {
                const filePath = path.join(__dirname, "../../", file.path);
                console.log(__dirname + "\n" + msg.req.file)
                deleteUploadedFile(filePath);
            })
        }
    }
}

module.exports = productMiddlewares;