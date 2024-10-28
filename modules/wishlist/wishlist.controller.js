const wishlistService = require('./wishlist.service');
const sendResponse = require('../../utils/sendResponse');

const wishlistController = {};

wishlistController.getWishlistByUser = async (req, res) => {
    const userId = req.user.id;
    const wishlist = await wishlistService.getWishlistByUser(userId);

    if (!wishlist) {
        return sendResponse(res, 404, {
            success: false,
            message: 'Wishlist not found',
            error: 'Wishlist does not exist'
        });
    }
    return sendResponse(res, 200, {
        success: true,
        message: 'Wishlist retrieved successfully',
        data: wishlist
    });
};

wishlistController.addProductToWishlist = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.body;

    const wishlist = await wishlistService.getWishlistByUser(userId);
    const productExists = wishlist?.products.some(item =>
        item.product.equals(productId)
    );

    if (productExists) {
        return sendResponse(res, 400, {
            success: false,
            message: 'Product already exists in the wishlist',
            error: 'Duplicate product'
        });
    }

    const updatedWishlist = await wishlistService.addProductToWishlist(userId, productId);
    return sendResponse(res, 200, {
        success: true,
        message: 'Product added to wishlist successfully',
        data: updatedWishlist
    });
};

wishlistController.removeProductFromWishlist = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;

    const updatedWishlist = await wishlistService.removeProductFromWishlist(userId, productId);
    if (!updatedWishlist) {
        return sendResponse(res, 404, {
            success: false,
            message: 'Product not found in wishlist',
            error: 'Product removal failed'
        });
    }
    return sendResponse(res, 200, {
        success: true,
        message: 'Product removed from wishlist successfully',
        data: updatedWishlist
    });
};

wishlistController.clearWishlist = async (req, res) => {
    const userId = req.user.id;

    const clearedWishlist = await wishlistService.deleteWishlistByUser(userId);
    if (!clearedWishlist) {
        return sendResponse(res, 404, {
            success: false,
            message: 'Wishlist not found',
            error: 'Wishlist clearance failed'
        });
    }
    return sendResponse(res, 200, {
        success: true,
        message: 'Wishlist cleared successfully',
        data: clearedWishlist
    });
};

module.exports = wishlistController;
