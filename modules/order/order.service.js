const Cart = require("../cart/cart.model");
const Product = require("../product/product.model");
const Order = require("./order.model");

const orderService = {};

orderService.createOrder = async (userId, products, orderData) => {
    if (!products || products.length === 0) {
        throw new Error("Product list is empty. Cannot create an order.");
    }

    const productDetails = await Product.find({ _id: { $in: products } });

    if (productDetails.length !== products.length) {
        throw new Error("Some products were not found.");
    }

    const outOfStockProducts = productDetails.filter(p => p.stock <= 0);
    if (outOfStockProducts.length > 0) {
        throw new Error("Some products are out of stock.");
    }

    const totalAmount = products.reduce((total, item) => {
        const product = productDetails.find(p => p._id.equals(item.productId));
        return total + (product ? product.price * item.quantity : 0);
    }, 0);

    const newOrder = new Order({
        userId,
        products,
        totalAmount,
        address: orderData.address,
        paymentMethod: orderData.paymentMethod
    });

    return await newOrder.save();
};


orderService.cancelOrder = async (orderId) => {
    const order = await Order.findById(orderId);
    if (!order) {
        throw new Error("Order not found.");
    }
    if (order.status === "shipped") {
        throw new Error("Order has already been shipped and cannot be cancelled.");
    }
    return await Order.findByIdAndUpdate(orderId, { status: "cancelled" }, { new: true, runValidators: true });
};


orderService.getOrdersByUser = async (userId) => {
    return await Order.find({ userId }).populate('products.productId');
};

orderService.getOrderById = async (orderId) => {
    return await Order.findById(orderId).populate('products.productId');
};

// functionlities only for admin
orderService.changeStatus = async (orderId, status) => {
    return await Order.findByIdAndUpdate(orderId, { status: status });
}

orderService.getAllOrders = async (query = {}) => {
    const orders = await Order.find(query);
    return orders;
}

module.exports = orderService;