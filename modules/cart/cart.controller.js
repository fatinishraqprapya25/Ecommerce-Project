const cartService = require('./cart.service');

const cartController = {};

cartController.createOrUpdateCart = async (req, res) => {
    const userId = req.user.id;
    const productData = req.body;

    const cart = await cartService.createOrUpdateCart(userId, productData);
    if (!cart) {
        return sendResponse(res, 400, {
            success: false,
            message: "Failed to create or update cart",
            error: "Cart operation failed"
        });
    }
    return sendResponse(res, 200, {
        success: true,
        message: "Product added successfully",
        data: cart
    });
};

cartController.getCartByUserId = async (req, res) => {
    const userId = req.user.id;

    const cart = await cartService.getCartByUserId(userId);
    if (!cart) {
        return sendResponse(res, 404, {
            success: false,
            message: "Cart not found",
            error: "Cart does not exist"
        });
    }
    return sendResponse(res, 200, {
        success: true,
        message: "Cart retrieved successfully",
        data: cart
    });
};

cartController.updateProductQuantity = async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.productId;
    const { quantity } = req.body;

    const cart = await cartService.updateProductQuantity(userId, productId, quantity);
    if (!cart) {
        return sendResponse(res, 404, {
            success: false,
            message: "Product not found in cart",
            error: "Product operation failed"
        });
    }
    return sendResponse(res, 200, {
        success: true,
        message: "Product quantity updated successfully",
        data: cart
    });
};

cartController.removeProductFromCart = async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.productId;

    const cart = await cartService.removeProductFromCart(userId, productId);
    if (!cart) {
        return sendResponse(res, 404, {
            success: false,
            message: "Cart not found or product not found in cart",
            error: "Product removal failed"
        });
    }
    return sendResponse(res, 200, {
        success: true,
        message: "Product removed from cart successfully",
        data: cart
    });
};

cartController.clearCart = async (req, res) => {
    const userId = req.user.id;

    const cart = await cartService.clearCart(userId);
    if (!cart) {
        return sendResponse(res, 404, {
            success: false,
            message: "Cart not found",
            error: "Cart clearance failed"
        });
    }
    return sendResponse(res, 200, {
        success: true,
        message: "Cart cleared successfully",
        data: cart
    });
};

module.exports = cartController;
