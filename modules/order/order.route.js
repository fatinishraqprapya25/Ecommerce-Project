const { Router } = require("express");
const checkLogin = require("../../middlewares/checkLogin");
const orderController = require("./order.controller");

const orderRouter = Router();

orderRouter.post("/", checkLogin, orderController.createOrder);
orderRouter.get("/", checkLogin, orderController.getOrdersByUser);
orderRouter.get("/:orderId", checkLogin, orderController.getOrderById);
orderRouter.patch("/:orderId", checkLogin, orderController.cancelOrder);

module.exports = orderRouter;