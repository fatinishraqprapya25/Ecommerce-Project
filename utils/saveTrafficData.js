const { default: mongoose } = require("mongoose")

const trafficSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    userType: {
        type: String,
        required: true,
    },
    activities: [
        {
            route: {
                type: String,
                required: true
            },
            method: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: String,
        required: true
    }
});

const Traffic = mongoose.model("Traffic", trafficSchema);

const saveTrafficData = async (trafficData) => {
    try {
        const { userType, userId, method, route } = trafficData;
        const currentDate = new Date().toISOString().split("T")[0];
        let traffic = await Traffic.findOne({ userId, date: currentDate });
        if (!traffic) {
            traffic = new Traffic({
                userId,
                userType,
                activities: [{ method, route, timestamp: Date.now() }],
                date: currentDate
            });
        } else {
            traffic.activities.push({
                route,
                method,
                timestamp: Date.now()
            });
        }

        await traffic.save();
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = { saveTrafficData, Traffic };