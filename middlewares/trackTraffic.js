const isLoggedIn = require("../utils/isLoggedin");

const trackTraffic = async (req, res, next) => {
    const loggedIn = isLoggedIn(req);
    const userType = loggedIn ? "authenticated" : "general";
    const userId = loggedIn ? req.user.id : req.ip;
    const trafficData = {
        userType,
        userId,
        route: req.originalUrl,
        method: req.method
    }
}

module.exports = trackTraffic;