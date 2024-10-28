const path = require("path");
const deleteUploadedFile = require("../../utils/deleteUploadedFile");

const campaignMiddlewares = {};

campaignMiddlewares.deteteUploadedPhotoIfValidationFailed = function (msg) {
    if (!msg.success) {
        if (msg.req.files) {
            msg.req.files.map(file => {
                const filePath = path.join(__dirname, "../../", file.path);
                deleteUploadedFile(filePath);
            })
        }
    }
}

module.exports = campaignMiddlewares;