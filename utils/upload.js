const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const config = require("../config/index");
const path = require("path");

function upload(uploadFolder, size, fileTypes) {
    const storage = new CloudinaryStorage({
        cloudinary,
        params: {
            folder: uploadFolder,
            allowed_formats: fileTypes.source.split("|"),
        }
    });

    const uploader = multer({
        storage: storage,
        limits: { fileSize: size * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
            const mimeType = fileTypes.test(file.mimetype);

            if (extname && mimeType) {
                cb(null, true);
            } else {
                cb(new Error("your file type is not supported here!"));
            }
        }
    });

    return uploader;
}

module.exports = upload;