const { Router } = require("express");
const productController = require("./product.controller");
const varifyAdmin = require("../../middlewares/checkAdmin");
const upload = require("../../utils/upload");
const validateRequest = require("../../middlewares/validateRequest");
const productValidations = require("./product.validations");
const deleteCloudinaryFile = require("../../utils/deleteUploadedFile");

const productRouter = Router();

const PRODUCT_IMG_MAX_SIZE = 15;
const PRODUCT_IMG_TYPES = /jpeg|jpg|png/;

// admin requests
productRouter.post("/", varifyAdmin, upload("products", PRODUCT_IMG_MAX_SIZE, PRODUCT_IMG_TYPES).array("images", 3), validateRequest(productValidations.createSchema, deleteCloudinaryFile), productController.createProduct);

productRouter.patch("/:id", varifyAdmin, productController.updateProduct);

productRouter.delete("/images/:productId", varifyAdmin, productController.removeProductImage);

productRouter.post("/images/:productId", varifyAdmin, upload("products", PRODUCT_IMG_MAX_SIZE, PRODUCT_IMG_TYPES).array("images", 3), productController.addProductImages);

productRouter.delete("/:id", varifyAdmin, productController.deleteProduct);

// user or non-user requests
productRouter.get("/", productController.getProducts);

productRouter.get("/:id", productController.getProductById);

module.exports = productRouter;
