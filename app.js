const express = require("express");
const app = express();
const helmet = require("helmet");
const appRouter = require("./routes/index");
const notFoundHandler = require("./error/notFoundHandler");
const globalErrorHandler = require("./error/globalErrorHandler");

app.use(helmet());
app.use("api/v1", appRouter);
app.use(globalErrorHandler);
app.use(notFoundHandler);

module.exports = app;