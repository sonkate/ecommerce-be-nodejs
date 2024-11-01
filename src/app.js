const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express();

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
// init database
require("./dbs/init.mongodb");

// init routes
app.use("/", require("./routes"));
// handle errors

module.exports = app;
