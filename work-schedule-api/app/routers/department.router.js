var router = require("express").Router();
var departmentController = require("../controllers/department.controller");
var auth = require("../middle-ware/auth");
var Department = require("../models/department.model");

router.get("/", auth.auth(), getDepartments);
router.post("/", auth.auth("Admin"), createDepartment);

module.exports = router;

function getDepartments(req, res, next) {
  departmentController.getDepartments(req, res);
}

function createDepartment(req, res, next) {
  var department = new Department(req.body);

  if (!department.id) {
    next({
      message: "id is required",
    });
  } else if (!department.name) {
    next({
      message: "name is required",
    });
  } else {
    departmentController.createDepartment(department, req, res);
  }
}
