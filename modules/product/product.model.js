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
        type: String,
        required: [true, 'Price is required'],
    },
    discount: {
        type: String,
    },
    stock: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        trim: true,
        maxlength: 50
    },
    images: [
        {
            source: { type: String, required: true },
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
    isFeatured: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
