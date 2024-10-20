const { Router } = require("express");
const publicUser = require("../modules/user/user.route");
const appRouter = Router();

const routes = [
    { path: "/auth", router: publicUser.authRoute },
    { path: "/user", router: publicUser.userRoute }
]

routes.forEach(route => appRouter.use(route.path, route.router));

module.exports = appRouter;