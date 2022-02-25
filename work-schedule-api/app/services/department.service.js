var DepartmentModel = require("../models/department.model");

async function getDepartments() {
  return await DepartmentModel.find();
}
async function getDepartmentById(id) {
  return await DepartmentModel.findOne({ id: id });
}
async function createDepartment(newDepartment) {
  var result = 400;
  await DepartmentModel.find({ id: newDepartment.id })
    .then(async function (foundDepartment) {
      if (foundDepartment.length > 0) {
        result = 401;
      } else {
        await newDepartment
          .save()
          .then(function () {
            result = 200;
          })
          .catch((err) => {
            console.error(err);
            result = 400;
          });
      }
    })
    .catch(function (err) {
      console.error(err);
      result = 400;
    });
  return result;
}

module.exports = {
  getDepartments: getDepartments,
  createDepartment: createDepartment,
  getDepartmentById: getDepartmentById,
};
