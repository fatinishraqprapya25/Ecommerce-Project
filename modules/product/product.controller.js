const productService = require('./product.service');
const sendResponse = require('../../utils/sendResponse');

const productController = {};

productController.createProduct = async (req, res) => {
    try {
        const productDetails = req.body;
        const isFeatured = productDetails?.isFeatured;
        if (isFeatured === "true") {
            productDetails.isFeatured = true;
        } else {
            productDetails.isFeatured = false;
        }
        const images = [];
        req.files.map(file => {
            const path = file.path;
            const filename = file.filename;
            images.push({ path, filename })
        });

        productDetails.images = images;

        const product = await productService.createProduct(productDetails);
        sendResponse(res, 201, {
            success: true,
            message: "Product created successfully!",
            data: product
        });
    } catch (error) {
        sendResponse(res, 400, {
            success: false,
            message: "Failed to create product",
            error: error.message
        });
    }
};

productController.getProducts = async (req, res) => {
    try {
        const search = req.query.search || "";
        const maxPrice = req.query.maxPrice || undefined;
        const minPrice = req.query.minPrice || undefined;
        const options = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
            sortBy: req.query.sortBy || 'createdAt',
            sortOrder: req.query.sortOrder || 'desc',
            maxPrice, minPrice,
            category: req.query.category || null
        };

        const result = await productService.getProducts(search, options);
        sendResponse(res, 200, {
            success: true,
            message: "Products retrieved successfully",
            data: result
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: "Error retrieving products",
            error: error.message
        });
    }
};

productController.getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return sendResponse(res, 404, {
                success: false,
                message: "Product not found"
            });
        }
        sendResponse(res, 200, {
            success: true,
            message: "Product found",
            data: product
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: "Error retrieving product",
            error: error.message
        });
    }
};

productController.updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        if (!product) {
            return sendResponse(res, 404, {
                success: false,
                message: "Product not found"
            });
        }
        sendResponse(res, 200, {
            success: true,
            message: "Product updated successfully",
            data: product
        });
    } catch (error) {
        sendResponse(res, 400, {
            success: false,
            message: "Error updating product",
            error: error.message
        });
    }
};

productController.removeProductImage = async (req, res) => {
    try {
        const { productId } = req.params;
        const { images } = req.body;
        const result = await productService.removeProductImage(productId, images);
        sendResponse(res, 200, {
            success: true,
            message: "Product Image removed successfully!",
            data: result
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Failed to remove product image!",
            error: err.message
        });
    }
}

productController.addProductImages = async (req, res) => {
    try {
        const { productId } = req.params;
        const images = [];
        if (req.files) {
            for (const image of req.files) {
                images.push({
                    path: image.path,
                    filename: image.filename
                });
            }
        } else {
            sendResponse(res, 200, {
                success: false,
                message: "no file uplaoded!"
            });
        }
        const result = await productService.addProductImages(productId, images);
        sendResponse(res, 200, {
            success: true,
            message: "Product Images added successfully!",
            data: result
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Failed to add images!",
            error: err.message
        });
    }
}

productController.deleteProduct = async (req, res) => {
    try {
        const product = await productService.deleteProduct(req.params.id);
        if (!product) {
            return sendResponse(res, 404, {
                success: false,
                message: "Product not found"
            });
        }
        sendResponse(res, 200, {
            success: true,
            message: "Product deleted successfully",
            data: product
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: "Error deleting product",
            error: error.message
        });
    }
};

module.exports = productController;
