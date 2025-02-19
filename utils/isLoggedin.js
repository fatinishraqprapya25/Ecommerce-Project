const jwt = require("jsonwebtoken");
const config = require("../config");

const isLoggedIn = async (req) => {

    const token = req.headers["authorization"];
    if (!token) return false;
    const decoded = jwt.verify(token, config.jwtSecret);
    if (!decoded) return false;
    return decoded;

}

module.exports = isLoggedIn;