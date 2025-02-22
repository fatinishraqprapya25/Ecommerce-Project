const { Router } = require("express");
const publicUser = require("../modules/user/user.route");
const adminRoute = require("../modules/admin/admin.route");
const productRouter = require("../modules/product/product.route");
const cartRouter = require("../modules/cart/cart.route");
const orderRouter = require("../modules/order/order.route");
const wishlistRouter = require("../modules/wishlist/wishlist.route");
const campaignRouter = require("../modules/campaign/campaign.route");

const appRouter = Router();

const routes = [
    { path: "/auth", router: publicUser.authRoute },
    { path: "/user", router: publicUser.userRoute },
    { path: "/admin", router: adminRoute },
    { path: "/products", router: productRouter },
    { path: "/cart", router: cartRouter },
    { path: "/orders", router: orderRouter },
    { path: "/wishlist", router: wishlistRouter },
    { path: "/campaign", router: campaignRouter },
]

routes.forEach(route => appRouter.use(route.path, route.router));

module.exports = appRouter;