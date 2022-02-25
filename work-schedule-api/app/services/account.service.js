var AccountModel = require("../models/account.model");
var crypto = require("crypto");
const config = require("../common/configs");
var DepartmentService = require("./department.service");
var RoleService = require("./role.service");
const client = require("twilio")(
  config.twilio.split(".")[0],
  config.twilio.split(".")[1]
);

require("dotenv").config();

module.exports = {
  createAccount: createAccount,
  sendCode: sendCodeToPhoneNumber,
  verifyCode: verifyCodePhoneNumber,
  getInfoUser: getInfoUser,
};

function sendCodeToPhoneNumber(phoneNumber, onSuccess, onFailure) {
  AccountModel.findOne({ phoneNumber: `+${phoneNumber.trim()}` })
    .then(function (foundAccount) {
      if (foundAccount) {
        if (foundAccount.isValid == false) {
          client.verify
            .services(config.serviceID)
            .verifications.create({
              to: `+${phoneNumber.trim()}`,
              channel: "sms",
            })
            .then(() => {
              onSuccess({
                statusCode: 200,
                message: "Code sent successfully",
              });
            })
            .catch((error) => {
              console.error(error);
              onFailure({
                statusCode: 409,
                message: error,
              });
            });
        } else {
          onFailure({
            statusCode: 400,
            message: "Code sending failed",
          });
        }
      } else {
        client.verify
          .services(config.serviceID)
          .verifications.create({
            to: `+${phoneNumber.trim()}`,
            channel: "sms",
          })
          .then(() => {
            AccountModel.create({
              phoneNumber: `+${phoneNumber.trim()}`,
              isValid: false,
            });
            onSuccess({
              statusCode: 200,
              message: "Code sent successfully",
            });
          })
          .catch((error) => {
            console.error(error);
            onFailure({
              statusCode: 408,
              message: error,
            });
          });
      }
    })
    .catch(function (err) {
      onFailure({
        statusCode: 401,
        message: error,
      });
    });
}

function verifyCodePhoneNumber(phoneNumber, code, onSuccess, onFailure) {
  client.verify
    .services(config.serviceID)
    .verificationChecks.create({
      to: `+${phoneNumber.trim()}`,
      code: code,
    })
    .then((res) => {
      AccountModel.updateOne(
        {
          phoneNumber: `+${phoneNumber.trim()}`,
        },
        {
          isValid: true,
        }
      )
        .then((_) => {
          onSuccess({
            statusCode: 200,
            message: "Phone number verification successful",
          });
        })
        .catch((err) => {
          onFailure({
            statusCode: 409,
            message: error,
          });
        });
    })
    .catch((error) => {
      console.error(error);
      if (error.status == 404) {
        onFailure({
          statusCode: 404,
          message: "Code isn't correct",
        });
      } else {
        result(
          {
            statusCode: 409,
            message: "Error",
          },
          null
        );
        onFailure({
          statusCode: 401,
          message: e,
        });
      }
    });
}

async function createAccount(newAccount, onSuccess, onFailure) {
  AccountModel.find({ phoneNumber: `${newAccount.phoneNumber.trim()}` })
    .then(async (foundAccount) => {
      if (foundAccount.length > 0 && foundAccount[0].isValid == true) {
        var hash = crypto
          .createHmac("sha256", process.env.SECRET_KEY)
          .update(newAccount.password)
          .digest("hex");
        var _role = await RoleService.getRoleById(newAccount.roleId);
        var _department = await DepartmentService.getDepartmentById(
          newAccount.departmentId
        );
       
        AccountModel.updateOne(
          {
            phoneNumber: newAccount.phoneNumber,
          },
          {
            password: hash,
            managerId: newAccount.managerId,
            username: newAccount.username,
            avatar: newAccount.avatar,
            role: _role,
            department: _department,
          }
        )
          .then(function (account) {
            onSuccess({
              statusCode: 200,
              message: "Account successfully created",
            });
          })
          .catch((err) => {
            console.log(err);
            onFailure({
              statusCode: 409,
              message: err,
            });
          });
      } else {
        onFailure({
          statusCode: 409,
          message: "Unverified phone number",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      onFailure({
        statusCode: 409,
        message: er,
      });
    });
}

async function getInfoUser(userId) {
  return await AccountModel.findOne({ userId: userId });
}
