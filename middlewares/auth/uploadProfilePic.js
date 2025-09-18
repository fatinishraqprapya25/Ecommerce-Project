const upload = require("../../utils/upload");

const uploadProfilePic = async (req, res, next) => {
    const fileTypes = /jpeg|jpg|png/;
    upload("profiles", 10, fileTypes).single("avatar")(req, res, (err) => {
        if (err) {
            req.file = null
        }
        next();
    });
}

module.exports = uploadProfilePic;