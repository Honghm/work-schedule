var router = require("express").Router();
var roleController = require("../controllers/role.controller");
var auth = require("../middle-ware/auth");
var Role = require("../models/role.model");

router.get("/", auth.auth(), getRoles);
router.post("/", auth.auth("Admin"), createRole);

module.exports = router;

function getRoles(req, res) {
  roleController.getRoles(req, res);
}

function createRole(req, res) {
  var role = Role(req.body);
  if (!role.id) {
    next({
      message: "id is required",
    });
  } else if (!role.name) {
    next({
      message: "name is required",
    });
  } else {
    roleController.createRole(role, req, res);
  }
}
