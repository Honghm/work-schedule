var express = require("express");
var morgan = require("morgan");
var helmet = require("helmet");
var cors = require("cors");
const path = require("path");
var bodyParser = require("body-parser");
var fileUpload = require("express-fileupload");
var connectDatabase = require("./app/configs/db.config");
var dotenv = require("dotenv");

dotenv.config();
connectDatabase();

const PORT = process.env.PORT || 8080;
const rfs = require("rotating-file-stream");
const isProduction = process.env.NODE_ENV === "production";

var app = express();
app.use(helmet());
var accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: path.join(__dirname, "log"),
});
app.use(
  isProduction ? morgan("combined", { stream: accessLogStream }) : morgan("dev")
);
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.json());

var errorHandler = require("./app/middle-ware/error-handler");

app.use(errorHandler.errorHandler());

/**
 * Các routers
 */
app.use("/api", require("./app/routers/router"));

app.get("/", (req, res) => {
  res.json({
    message: "Not Found",
  });
});
app.get("*", (req, res) => {
  res.json({
    message: "Not Found",
  });
});

app.listen(PORT, function () {
  console.log(`Server on ${PORT}`);
});
