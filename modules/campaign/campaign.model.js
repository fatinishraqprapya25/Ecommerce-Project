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
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                const numValue = Number(value);
                return !isNaN(numValue) && numValue >= 0 && numValue <= 100;
            },
            message: 'Discount percentage must be a number between 0 and 100.',
        },
    },
    images: [
        {
            source: { type: String, required: true }
        }
    ],
    isActive: {
        type: Boolean,
        default: true,
    },
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
