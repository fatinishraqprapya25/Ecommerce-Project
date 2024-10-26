const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    category: {
        type: String,
        required: true,
        enum: ['Electronics', 'Clothing', 'Books', 'Accessories', 'Home Appliances', 'Others']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 0
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
        validate: {
            validator: function (value) {
                return value <= 100;
            },
            message: 'Discount cannot exceed 100%'
        }
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    brand: {
        type: String,
        trim: true,
        maxlength: 50
    },
    images: [
        {
            url: { type: String, required: true },
            altText: { type: String }
        }
    ],
    ratingsAverage: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    ratingsCount: {
        type: Number,
        default: 0
    },
    reviews: [reviewSchema],
    isFeatured: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
