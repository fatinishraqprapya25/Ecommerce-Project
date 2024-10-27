const { Router } = require("express");
const productController = require("./product.controller");
const varifyAdmin = require("../../middlewares/checkAdmin");
const upload = require("../../utils/upload");
const validateRequest = require("../../middlewares/validateRequest");
const productValidations = require("./product.validations");
const productMiddlewares = require("./product.middlewares");

const productRouter = Router();

// admin requests
productRouter.post("/", varifyAdmin, upload("products").array("images", 3), validateRequest(productValidations.createSchema, productMiddlewares.deteteUploadedPhotoIfValidationFailed), productController.createProduct);
productRouter.patch("/:id", varifyAdmin, productController.updateProduct);
productRouter.delete("/:id", varifyAdmin, productController.deleteProduct);

// user or non-user requests
productRouter.get("/", productController.getProducts);
productRouter.get("/:id", productController.getProductById);
productRouter.get("/category/:category", productController.getProductsByCategory);

module.exports = productRouter;
