const Wishlist = require('./wishlist.model');

const wishlistService = {};

wishlistService.getWishlistByUser = async (userId) => {
    const result = await Wishlist.findOne({ user: userId }).populate('products.product');
    return result;
}

wishlistService.addProductToWishlist = async (userId, productId) => {
    return await Wishlist.findOneAndUpdate(
        { user: userId },
        { $addToSet: { products: { product: productId } } },
        { new: true, upsert: true }
    );
}

wishlistService.removeProductFromWishlist = async (userId, productId) => {
    const result = Wishlist.findOneAndUpdate(
        { user: userId },
        { $pull: { products: { product: productId } } },
        { new: true }
    );
    return result;
}

wishlistService.deleteWishlistByUser = async (userId) => {
    const result = Wishlist.findOneAndDelete({ user: userId });
    return result;
}

module.exports = wishlistService;
