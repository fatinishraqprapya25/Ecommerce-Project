const { Router } = require("express");
const productController = require("./product.controller");
const varifyAdmin = require("../../middlewares/checkAdmin");
const upload = require("../../utils/upload");
const validateRequest = require("../../middlewares/validateRequest");
const productValidations = require("./product.validations");

const productRouter = Router();

// admin requests
productRouter.post("/", upload("products").array("images", 3), varifyAdmin, validateRequest(productValidations.createSchema), productController.createProduct);
productRouter.patch("/:id", varifyAdmin, productController.updateProduct);
productRouter.delete("/:id", varifyAdmin, productController.deleteProduct);

// user or non-user requests
productRouter.get("/", productController.getProducts);
productRouter.get("/:id", productController.getProductById);

module.exports = productRouter;
