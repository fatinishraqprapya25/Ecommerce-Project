const Product = require('./product.model.js');

const productService = {};

productService.createProduct = async (productData) => {
    return await Product.create(productData);
};

productService.getProducts = async (search, options = {}) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', maxPrice, minPrice } = options;
    const skip = (page - 1) * limit;

    let query;
    if (search) {
        const regex = new RegExp(search, 'i');
        query = {
            $or: [
                { name: regex },
                { description: regex },
                { category: regex }
            ]
        };
    } else {
        query = {};
    }

    if (maxPrice !== undefined || minPrice !== undefined) {
        query.price = {};
        if (maxPrice !== undefined) {
            query.price.$lte = parseFloat(maxPrice);
        }
        if (minPrice !== undefined) {
            query.price.$gte = minPrice;
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

productService.deleteProduct = async (id) => {
    return await Product.findByIdAndUpdate(id, { isDeleted: true });
};

productService.getProductByCategory = async (category, options = {}) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = options;
    const skip = (page - 1) * limit;
    return await Product.find({ category })
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(limit);
}

module.exports = productService;
