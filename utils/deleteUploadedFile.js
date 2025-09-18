const cloudinary = require("../config/cloudinary");

const deleteCloudinaryFile = async (params) => {
    try {
        if (!params.success) {
            if (params.req.file?.filename) {
                await cloudinary.uploader.destroy(params.req.file.filename);
            } else if (params.req.files?.length > 0) {
                for (const file of params.req.files) {
                    await cloudinary.uploader.destroy(file.filename);
                }
            }
        }
    } catch (err) {
        console.log(err.message);
    }
};

module.exports = deleteCloudinaryFile;
