const { Router } = require("express");
const cartController = require("./cart.controller");
const checkLogin = require("../../middlewares/checkLogin");

const cartRouter = Router();

cartRouter.post("/", checkLogin, cartController.createOrUpdateCart);
cartRouter.get("/", checkLogin, cartController.getCartByUserId);
cartRouter.patch("/:productId", checkLogin, cartController.updateProductQuantity);
cartRouter.delete("/:productId", checkLogin, cartController.removeProductFromCart);
cartRouter.delete("/:productId", checkLogin, cartController.removeProductFromCart);

module.exports = cartRouter;