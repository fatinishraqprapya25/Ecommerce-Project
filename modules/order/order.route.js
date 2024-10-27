const { Router } = require("express");
const checkLogin = require("../../middlewares/checkLogin");
const validateRequest = require("../../middlewares/validateRequest");
const orderController = require("./order.controller");
const orderValidatdions = require("./order.validation");

const orderRouter = Router();

orderRouter.post("/", validateRequest(orderValidatdions.createOrder), checkLogin, orderController.createOrder);
orderRouter.get("/", checkLogin, orderController.getOrdersByUser);
orderRouter.get("/:orderId", checkLogin, orderController.getOrderById);
orderRouter.patch("/:orderId", checkLogin, orderController.cancelOrder);
adminRoute.post("/status", checkAdmin, adminController.changeOrderStatus);
adminRoute.get("/all", checkAdmin, adminController.getAllOrders);

module.exports = orderRouter;