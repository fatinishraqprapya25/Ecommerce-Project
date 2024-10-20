const { Router } = require("express");
const userRoute = require("../modules/user/user.route");
const appRouter = Router();

const routes = [
    { path: "/auth", router: userRoute }
]

routes.forEach(route => appRouter.use(route.path, route.router));

module.exports = appRouter;