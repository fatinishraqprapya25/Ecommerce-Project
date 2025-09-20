const Rating = require("./rating.model");

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

ratingService.updateRating = async (id, userId, newRatingValue) => {
    const rating = await Rating.findOneAndUpdate(
        { _id: id, userId },
        { rating: newRatingValue },
        { new: true }
    );

    if (!rating) throw new Error("Rating not found!");
    return rating;
};

ratingService.deleteRating = async (id, userId) => {
    const rating = await Rating.findOneAndDelete({ _id: id, userId });
    if (!rating) throw new Error("Rating not found!");
    return rating;
};

module.exports = ratingService;
