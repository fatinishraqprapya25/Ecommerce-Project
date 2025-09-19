const Cart = require('./cart.model');
const cartService = {};

cartService.createOrUpdateCart = async (userId, productData) => {
    const cart = await Cart.findOneAndUpdate(
        { userId },
        { $set: { userId }, $addToSet: { products: productData } },
        { new: true, upsert: true, runValidators: true }
    );
    return cart;
};

cartService.getCartByUserId = async (userId) => {
    const cart = await Cart.findOne({ userId }).populate('products.productId');
    return cart;
};

cartService.updateProductQuantity = async (userId, productId, quantity) => {
    const cart = await Cart.findOneAndUpdate(
        { userId, 'products.productId': productId },
        { $set: { 'products.$.quantity': quantity } },
        { new: true, runValidators: true }
    );

    return cart;
};

cartService.removeProductFromCart = async (userId, productId) => {
    const cart = await Cart.findOneAndUpdate(
        { userId },
        { $pull: { products: { productId } } },
        { new: true }
    );

    return cart;
};

cartService.clearCart = async (userId) => {
    const cart = await Cart.findOneAndDelete({ userId });
    return cart;
};

module.exports = cartService;
