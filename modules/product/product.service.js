const Product = require('../models/Product');

const productService = {};

productService.createProduct = async (productData) => {
    return await Product.create(productData);
};

productService.getProducts = async (filters = {}, options = {}) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options;
    const skip = (page - 1) * limit;

    const products = await Product.find(filters)
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(limit);

    const total = await Product.countDocuments(filters);

    return { products, total, page, limit };
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

productService.deleteProduct = async (id) => {
    return await Product.findByIdAndUpdate(id, { isDeleted: true });
};

module.exports = productService;
