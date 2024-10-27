const orderService = require('./order.service');
const sendResponse = require('../../utils/sendResponse');

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
        console.log(orders)
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
        const order = await orderService.cancelOrder(orderId);
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

orderController.changeOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;
    try {
        const updatedOrder = await orderService.changeStatus(orderId, status);

        if (!updatedOrder) {
            return sendResponse(res, 404, {
                success: false,
                message: "Order not found",
            });
        }

        return sendResponse(res, 200, {
            success: true,
            message: "Order status updated successfully",
            data: updatedOrder,
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: "failed changing order status",
            error: error.message
        });
    }
};

orderController.getAllOrders = async (req, res) => {
    try {
        const query = req.query;
        const orders = await orderService.getAllOrders(query);

        if (!orders || orders.length === 0) {
            return sendResponse(res, 404, {
                success: false,
                message: "No orders found",
            });
        }

        return sendResponse(res, 200, {
            success: true,
            message: "Orders retrieved successfully",
            data: orders,
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: "Failed retrieving orders",
            error: error.message,
        });
    }
};

module.exports = orderController;
