const Product = require('./product.model.js');
const cloudinary = require("../../config/cloudinary.js");

const productService = {};

productService.createProduct = async (productData) => {
    return await Product.create(productData);
};

productService.getProducts = async (search, options = {}) => {
    const {
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        maxPrice,
        minPrice,
        category
    } = options;

    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
        const regex = new RegExp(search, 'i');
        query.$or = [
            { name: regex },
            { description: regex },
            { category: regex }
        ];
    }

    if (category) {
        query.category = category;
    }
    if (maxPrice !== undefined || minPrice !== undefined) {
        query.price = {};
        if (maxPrice !== undefined) {
            query.price.$lte = parseFloat(maxPrice);
        }
        if (minPrice !== undefined) {
            query.price.$gte = parseFloat(minPrice);
        }
    }

    const products = await Product.find(query)
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(limit);

    const total = await Product.countDocuments(query);

    return { total, page, limit, products };
};


productService.getProductById = async (id) => {
    return await Product.findById(id);
};

productService.updateProduct = async (id, updateData) => {
    return await Product.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    });
};

productService.removeProductImage = async (id, images = []) => {
    const product = await Product.findById(id);
    product.images = product.images.filter(img => !images.includes(img.filename));
    for (const image of images) {
        await cloudinary.uploader.destroy(image);
    }
    const result = await product.save();
    return result;
}

productService.addProductImages = async (id, images) => {
    const product = await Product.findById(id);
    if (product.images.length + images.length > 3) {
        for (const image of images) {
            await cloudinary.uploader.destroy(image.filename);
        }
        throw new Error("Product cannot contain more than 3 images!");
    }
    product.images.push(...images);
    const result = await product.save();
    return result;
}

productService.deleteProduct = async (id) => {
    return await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

module.exports = productService;
