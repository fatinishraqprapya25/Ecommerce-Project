const Rating = require("../models/rating.model");

const ratingService = {};

ratingService.createRating = async ({ rating, userId, productId }) => {
    const newRating = new Rating({ rating, userId, productId });
    return await newRating.save();
};

ratingService.getAllRatings = async () => {
    return await Rating.find()
        .populate("userId", "name email")
        .populate("productId", "name price");
};

ratingService.getRatingsByProduct = async (productId) => {
    return await Rating.find({ productId })
        .populate("userId", "name email");
};

ratingService.updateRating = async (id, newRatingValue) => {
    return await Rating.findByIdAndUpdate(
        id,
        { rating: newRatingValue },
        { new: true, runValidators: true }
    );
};

ratingService.deleteRating = async (id) => {
    return await Rating.findByIdAndDelete(id);
};

module.exports = ratingService;
