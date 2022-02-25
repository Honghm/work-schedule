var DepartmentService = require("../services/department.service");

module.exports = {
  createDepartment: createDepartment,
  getDepartments: getDepartments,
  getDepartmentById:getDepartmentById
};

async function getDepartments(req, res) {
  try {
    const departments = await DepartmentService.getDepartments();
    if (departments) {
      res.status(200).json({
        data: departments,
      });
    } else {
      res.status(400);
    }
  } catch (error) {
    res.status(400);
  }
}
async function getDepartmentById(id, res) {
  var department = await DepartmentService.getDepartmentById(id);
  if (department) {
    res.status(200).json({
      data: {
        id: department.id,
        name: department.name,
        created_at: department.created_at,
      },
    });
  } else {
    res.status(400);
  }
}
async function createDepartment(newDepartment, req, res) {
  try {
    const result = await DepartmentService.createDepartment(newDepartment);
    switch (result) {
      case 200:
        res.status(200).json({
          statusCode: 200,
          message: "Create department successfully",
        });
        break;
      case 401:
        res.status(401).json({
          statusCode: 401,
          message: "Department already exists",
        });
        break;
      case 400:
        res.status(400).json({
          statusCode: 400,
          message: "An error occurred",
        });
        break;
      default:
        break;
    }
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      message: "An error occurred",
    });
  }
}
