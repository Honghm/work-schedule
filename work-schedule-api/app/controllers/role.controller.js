
var RoleService = require("../services/role.service");

module.exports = {
  createRole: createRole,
  getRoles: getRoles,
};

async function getRoles(req, res) {
  try {
    const roles = await RoleService.getRoles();
    if (roles) {
      res.status(200).json({
        data: roles,
      });
    } else {
      res.status(400);
    }
  } catch (error) {
    res.status(400);
  }
}

async function createRole(newRole, req, res) {
  try {
    const result = await RoleService.createRole(newRole);
    switch (result) {
      case 200:
        res.status(200).json({
          statusCode: 200,
          message: "Create role successfully",
        });
        break;
      case 401:
        res.status(401).json({
          statusCode: 401,
          message: "Role already exists",
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
