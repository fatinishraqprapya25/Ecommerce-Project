const jwt = require("jsonwebtoken");
const config = require("../config");

const isLoggedIn = async (req) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

        const token = authHeader.split(" ")[1];
        return jwt.verify(token, config.jwtSecret);
    } catch (error) {
        return null;
    }
};

module.exports = isLoggedIn;
