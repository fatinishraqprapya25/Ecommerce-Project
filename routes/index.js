const { Router } = require("express");
const publicUser = require("../modules/user/user.route");
const adminRoute = require("../modules/admin/admin.route");
const productRouter = require("../modules/product/product.route");
const cartRouter = require("../modules/cart/cart.route");
const orderRouter = require("../modules/order/order.route");
const wishlistRouter = require("../modules/wishlist/wishlist.route");

const appRouter = Router();

const routes = [
    { path: "/auth", router: publicUser.authRoute },
    { path: "/user", router: publicUser.userRoute },
    { path: "/admin", router: adminRoute },
    { path: "/products", router: productRouter },
    { path: "/cart", router: cartRouter },
    { path: "/checkout", router: orderRouter },
    { path: "/wishlist", router: wishlistRouter },
]

routes.forEach(route => appRouter.use(route.path, route.router));

module.exports = appRouter;