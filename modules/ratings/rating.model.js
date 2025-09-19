const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    rating: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                const num = Number(value);
                return Number.isInteger(num) && num >= 1 && num <= 5;
            }
        }
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    productId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Product"
    }
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
