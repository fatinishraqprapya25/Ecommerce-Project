const isLoggedIn = require("../utils/isLoggedin");
const { saveTrafficData } = require("../utils/saveTrafficData");

const trackTraffic = async (req, res, next) => {
    try {
        const loggedIn = await isLoggedIn(req);
        const userType = loggedIn ? "authenticated" : "general";
        const userId = loggedIn ? loggedIn.id : req.ip;

        const trafficData = {
            userType,
            userId,
            route: req.originalUrl,
            method: req.method,
            timestamp: new Date(),
        };
        await saveTrafficData(trafficData);
    } catch (error) {
        console.error("Error tracking traffic:", error);
    }

    next();
};

module.exports = trackTraffic;
