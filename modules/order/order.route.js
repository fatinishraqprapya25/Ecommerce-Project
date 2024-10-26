const { Router } = require("express");
const checkLogin = require("../../middlewares/checkLogin");
const orderController = require("./order.controller");

const orderRouter = Router();
orderRouter.post("/", checkLogin, orderController.createOrder);

module.exports = orderRouter;