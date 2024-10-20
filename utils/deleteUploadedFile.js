const fs = require("fs");

const deleteUploadedFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) console.error("Failed to delete file:", err);
    });
};

module.exports = deleteUploadedFile;