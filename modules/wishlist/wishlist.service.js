const Wishlist = require('./wishlist.model');

const wishlistService = {};

wishlistService.getWishlistByUser = async (userId) => {
    await Wishlist.findOne({ user: userId }).populate('products.product');
}

wishlistService.addProductToWishlist = async (userId, productId) => {
    await Wishlist.findOneAndUpdate(
        { user: userId },
        { $addToSet: { products: { product: productId } } },
        { new: true, upsert: true }
    );
}

wishlistService.removeProductFromWishlist = async (userId, productId) => {
    await Wishlist.findOneAndUpdate(
        { user: Types.ObjectId(userId) },
        { $pull: { products: { product: productId } } },
        { new: true }
    );
}

wishlistService.deleteWishlistByUser = async (userId) => {
    await Wishlist.findOneAndDelete({ user: userId });
}

module.exports = wishlistService;
