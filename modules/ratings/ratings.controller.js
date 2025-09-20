const ratingService = require('./rating.service');
const sendResponse = require('../../utils/sendResponse');

const ratingController = {};

ratingController.createRating = async (req, res) => {
    const { rating, productId } = req.body;
    const userId = req.user.id;

    try {
        const newRating = await ratingService.createRating({ rating, userId, productId });
        sendResponse(res, 201, {
            success: true,
            message: 'Rating created successfully!',
            data: newRating
        });
    } catch (error) {
        sendResponse(res, 400, {
            success: false,
            message: 'Failed to create rating',
            error: error.message
        });
    }
};

ratingController.getAllRatings = async (req, res) => {
    try {
        const ratings = await ratingService.getAllRatings();
        sendResponse(res, 200, {
            success: true,
            message: 'All ratings retrieved successfully!',
            data: ratings
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: 'Failed to retrieve ratings',
            error: error.message
        });
    }
};

ratingController.getRatingsByProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const ratings = await ratingService.getRatingsByProduct(productId);
        sendResponse(res, 200, {
            success: true,
            message: `Ratings for product ${productId} retrieved successfully!`,
            data: ratings
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: 'Failed to retrieve ratings for product',
            error: error.message
        });
    }
};

ratingController.updateRating = async (req, res) => {
    const { id, rating } = req.body;

    try {
        const updatedRating = await ratingService.updateRating(id, rating);

        if (!updatedRating) {
            return sendResponse(res, 404, {
                success: false,
                message: 'Rating not found'
            });
        }

        sendResponse(res, 200, {
            success: true,
            message: 'Rating updated successfully!',
            data: updatedRating
        });
    } catch (error) {
        sendResponse(res, 400, {
            success: false,
            message: 'Failed to update rating',
            error: error.message
        });
    }
};

ratingController.deleteRating = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRating = await ratingService.deleteRating(id);

        if (!deletedRating) {
            return sendResponse(res, 404, {
                success: false,
                message: 'Rating not found'
            });
        }

        sendResponse(res, 200, {
            success: true,
            message: 'Rating deleted successfully!',
            data: deletedRating
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: 'Failed to delete rating',
            error: error.message
        });
    }
};

module.exports = ratingController;
