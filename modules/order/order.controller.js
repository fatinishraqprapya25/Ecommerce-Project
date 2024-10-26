const orderService = require('./order.service');
const sendResponse = require('../utils/sendResponse');

const orderController = {};

orderController.createOrder = async (req, res) => {
    const { address, paymentMethod } = req.body;
    const userId = req.user.id;

    try {
        const order = await orderService.createOrder(userId, { address, paymentMethod });
        sendResponse(res, 201, {
            success: true,
            message: 'Order created successfully!',
            data: order
        });
    } catch (error) {
        sendResponse(res, 400, {
            success: false,
            message: "failed creating order",
            error: error.message
        });
    }
};

orderController.getOrdersByUser = async (req, res) => {
    const userId = req.user.id;
    try {
        const orders = await orderService.getOrdersByUser(userId);
        sendResponse(res, 200, {
            success: true,
            message: 'Orders fetched successfully!',
            data: orders
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: 'Failed to fetch orders',
            error: error.message
        });
    }
};

orderController.getOrderById = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await orderService.getOrderById(orderId);
        if (!order) {
            return sendResponse(res, 404, {
                success: false,
                message: 'Order not found'
            });
        }
        sendResponse(res, 200, {
            success: true,
            message: 'Order fetched successfully!',
            data: order
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: 'Failed to fetch order',
            error: error.message
        });
    }
};

orderController.cancelOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await orderService.deleteOrder(orderId);
        if (!order) {
            return sendResponse(res, 404, {
                success: false,
                message: 'Order not found'
            });
        }
        sendResponse(res, 200, {
            success: true,
            message: 'Order cancelled successfully!',
            data: order
        });
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: 'Failed to cancelling order',
            error: error.message
        });
    }
};

module.exports = orderController;