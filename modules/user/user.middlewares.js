const upload = require("../../utils/upload");

const userMiddlewares = {};

userMiddlewares.uploader = (req, res, next) => {
    upload("profiles").single("avatar")(req, res, (err) => {
        if (err) {
            console.log(err.msg);
            req.file = null
        }
        next();
    });
}

module.exports = userMiddlewares;