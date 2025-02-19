const isLoggedIn = require("../utils/isLoggedin");

const trackTraffic = async (req, res, next) => {
    const isLoggedIn = isLoggedIn(req);
    const userType = isLoggedIn ? "authenticated" : "general";
    const userId = isLoggedIn ? req.user.id : req.ip;
    const trafficData = {
        userType,
        userId,
        route: req.originalUrl,
        method: req.method
    }
}

module.exports = trackTraffic;