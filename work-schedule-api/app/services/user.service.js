var path = require("path");

var UserModel = require("../models/user.model");
var RoleModel = require("../models/role.model");

async function getInfoUser(userId) {
  return await UserModel.findOne({ userId: userId });
}

async function getRoleById(roleId) {
  return await RoleModel.findOne({ roleId: roleId });
}

async function createUser(data, account) {
  UserModel.find({
    accountId: account.id,
    phoneNumber: account.phoneNumber,
  })
    .then(async function (foundUsers) {
      if (foundUsers.length > 0) {
        return Promise.reject({
          statusCode: 400,
          message: "User is existed",
        });
      } else {
        var role = await getRoleById(data.roleId);
        var department = await getDepartmentById(data.departmentId);
        return UserModel.create({
          accountId: account.id,
          phoneNumber: account.phoneNumber,
          manager: data.manager,
          username: data.username,
          avatar: data.avatar,
          role: role,
          department: department,
        });
      }
    })
    .catch(function (err) {
      return Promise.reject(err);
    });
}
async function uploadAvatar(userId, file) {
  UserModel.findOne({ _id: userId })
    .then((user) => {
      var nameFile = "user_" + user._id + "." + file.name.split(".")[1];
      if (user) {
        new Promise((resolve, reject) => {
          file.mv(
            path.join(__dirname, "../public/avatar/" + nameFile),
            (err) => {
              if (err) {
                return reject(err);
              }

              UserModel.updateOne(
                { _id: userId },
                { $set: { avatar: nameFile } }
              )
                .then((data) => {
                  return resolve({ message: "Upload image sucess" });
                })
                .catch((err) => {
                  return reject(err);
                });
            }
          );
        });
      } else {
        return Promise.reject({
          message: "up load avatar fail!",
          statusCode: 404,
        });
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

module.exports = {
  getInfoUser: getInfoUser,
  createUser: createUser,
  uploadAvatar: uploadAvatar,
};
