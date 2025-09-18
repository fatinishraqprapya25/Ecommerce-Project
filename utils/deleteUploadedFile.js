const cloudinary = require("../config/cloudinary");

const deleteCloudinaryFile = async (params) => {
    try {
        if (!params.success) {
            if (params.req.file.filename) {
                const result = await cloudinary.uploader.destroy(params.req.file.filename);
                console.log("Deleted: ", result);
            }
        }
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = deleteCloudinaryFile;