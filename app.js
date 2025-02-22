const express = require("express");
const app = express();
const helmet = require("helmet");
const appRouter = require("./routes/index");
const notFoundHandler = require("./error/notFoundHandler");
const globalErrorHandler = require("./error/globalErrorHandler");
const trackTraffic = require("./middlewares/trackTraffic");

app.use(helmet());
app.use(express.json());
app.use(trackTraffic);
app.use("/api/v1", appRouter);
app.use(globalErrorHandler);
app.use(notFoundHandler);

module.exports = app;