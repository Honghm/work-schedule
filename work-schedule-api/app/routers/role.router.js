var router = require("express").Router();
var roleController = require("../controllers/role.controller");
var auth = require("../middle-ware/auth");
var Role = require("../models/role.model");

router.get("/", auth.auth(), getRoles);
router.get("/:id", auth.auth(), getRoleById);
router.post("/", auth.auth("Admin"), createRole);

module.exports = router;

function getRoles(req, res) {
  roleController.getRoles(res);
}
function getRoleById(req, res) {
  roleController.getRoleById(req.params.id, res);
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
