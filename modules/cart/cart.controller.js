const cartService = require('./cart.service');
const sendResponse = require("../../utils/sendResponse");

const cartController = {};

cartController.createOrUpdateCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cartDetails = req.body;
        let cart = await cartService.getCartByUserId(userId);
        if (cart) {
            const productExists = cart.products.some(
                item => item.productId.equals(cartDetails.productId)
            );
            if (productExists) {
                return sendResponse(res, 400, {
                    success: false,
                    message: "Product already exists in the cart",
                    error: "Duplicate product"
                });
            }
        }

        const updatedCart = await cartService.createOrUpdateCart(userId, cartDetails);

        return sendResponse(res, 200, {
            success: true,
            message: "Product added successfully",
            data: updatedCart
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: "Failed to create or update cart",
            error: error.message
        });
    }
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
