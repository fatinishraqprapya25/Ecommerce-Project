const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const wishlistSchema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            ref: 'User',
            required: true,
        },
        products: [
            {
                product: {
                    type: Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
            },
        ],
    },
    { timestamps: true, }
);

wishlistSchema.index({ user: 1 }, { unique: true });

const Wishlist = model('Wishlist', wishlistSchema);

module.exports = Wishlist;
