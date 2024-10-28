const { Router } = require("express");
const checkLogin = require("../../middlewares/checkLogin");
const wishlistController = require("./wishlist.controller");

const wishlistRouter = Router();

wishlistRouter.post("/", checkLogin, wishlistController.addProductToWishlist);
wishlistRouter.get("/", checkLogin, wishlistController.getWishlistByUser);
wishlistRouter.delete("/:productId", checkLogin, wishlistController.removeProductFromWishlist);
wishlistRouter.delete("/clear", checkLogin, wishlistController.clearWishlist);

module.exports = wishlistRouter;