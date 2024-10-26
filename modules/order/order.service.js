const mongoose = require("mongoose");
const Cart = require("../cart/cart.model");
const Order = require("./order.model");

const orderService = {};

orderService.createOrder = async (userId, orderData) => {
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart || cart.products.length === 0) throw new Error("Cart is empty. Cannot create an order.'");

    const totalAmount = cart.products.reduce((total, item) =>
        total + item.productId.price * item.quantity, 0
    );

    const newOrder = new Order({
        userId,
        products: cart.products,
        totalAmount,
        address: orderData.address,
        paymentMethod: orderData.paymentMethod
    });

    const savedOrder = newOrder.save();
    return savedOrder;

}

module.exports = orderService;