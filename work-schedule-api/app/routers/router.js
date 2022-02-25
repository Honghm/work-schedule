var express = require("express");

var loginRouter = require("./auth.router");
var accountRouters = require("./account.router");
var roleRouters = require("./role.router");
var departmentRouters = require("./department.router");
var bookingRouters = require("./booking.router");

const apiRoute = express();

apiRoute.use("/login", loginRouter);
apiRoute.use("/account", accountRouters);
apiRoute.use("/role", roleRouters);
apiRoute.use("/department", departmentRouters);
apiRoute.use("/booking", bookingRouters);

module.exports = apiRoute;
