const { Router } = require("express");
const checkLogin = require("../../middlewares/checkLogin");
const checkAdmin = require("../../middlewares/checkAdmin");
const validateRequest = require("../../middlewares/validateRequest");
const orderController = require("./order.controller");
const orderValidatdions = require("./order.validation");

const orderRouter = Router();

orderRouter.post("/checkout", validateRequest(orderValidatdions.createOrder), checkLogin, orderController.createOrder);
orderRouter.get("/", checkLogin, orderController.getOrdersByUser);
orderRouter.get("/:orderId", checkLogin, orderController.getOrderById);
orderRouter.patch("/:orderId", checkLogin, orderController.cancelOrder);
orderRouter.post("/status", validateRequest(orderValidatdions.changeOrderStatus), checkAdmin, orderController.changeOrderStatus);
orderRouter.get("/get/all", checkAdmin, orderController.getAllOrders);

module.exports = orderRouter;