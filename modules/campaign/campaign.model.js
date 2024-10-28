const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["banner", "campaign"],
        default: "banner"
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    discountPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    image: [
        {
            type: String,
            required: true,
        }
    ],
    isActive: {
        type: Boolean,
        default: true,
    },
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
