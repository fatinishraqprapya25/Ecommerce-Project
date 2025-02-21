const multer = require("multer");
const path = require("path");

function upload(uploadFolder, size, fileTypes) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `uploads/${uploadFolder}`);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            const filename = `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`;
            cb(null, filename);
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