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
    const rating = await Rating.findById(id);
    if (!rating) throw new Error("Rating not found!");
    if (rating.userId.equals(userId)) {
        rating.rating = newRatingValue;
        const result = await rating.save();
        return result;
    } else {
        throw new Error("The rating is not created by the user!");
    }
};

ratingService.deleteRating = async (id) => {
    return await Rating.findByIdAndDelete(id);
};

module.exports = ratingService;
