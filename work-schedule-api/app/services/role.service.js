var RoleModel = require("../models/role.model");

async function getRoles() {
  return await RoleModel.find();
}

async function createRole(newRole) {
  var result = 400;
  await RoleModel.find({ id: newRole.id })
    .then(async function (foundRole) {
      if (foundRole.length > 0) {
        result = 401;
      } else {
        await newRole
          .save()
          .then(function (role) {
            result = 200;
          })
          .catch((err) => {
            result = 400;
          });
      }
    })
    .catch(function (err) {
      result = 400;
    });
  return result;
}

module.exports = {
  getRoles: getRoles,
  createRole: createRole,
};
