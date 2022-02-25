var AccountModel = require("../models/account.model");
var crypto = require("crypto");
var jwt = require("../utils/jwt");
require("dotenv").config();

module.exports = {
  login: login,
  checkAuth: checkAuth,
};

async function login(phoneNumber, password, onSuccess, onFailure) {
  var hash = crypto
    .createHmac("sha256", process.env.SECRET_KEY)
    .update(password)
    .digest("hex");
  const user = await AccountModel.findOne({
    phoneNumber: phoneNumber,
  });

  AccountModel.findOne({
    phoneNumber: phoneNumber,
    password: hash,
  })
    .then(function (account) {
      if (account) {
        
        jwt.sign(
          {
            phoneNumber: account.phoneNumber,
            userId: user.id,
            role: user.role,
          },
          function (err, token) {
            if (err) {
              onFailure({
                statusCode: 400,
                message: err.message,
              });
            } else {
              onSuccess({
                token: token,
                expires_in: process.env.TOKEN_EXPPIRES,
                token_type: process.env.TOKEN_TYPE,
              });
            }
          }
        );
      } else {
        onFailure({
          statusCode: 401,
          message: "Phone number or password is incorrect",
        });
      }
    })
    .catch(function (err) {
      console.error(err);
      onFailure({
        statusCode: 402,
        message: "Phone number or password is incorrect",
      });
    });
}

function checkAuth(account, onSuccess, onFailure) {
  AccountModel.findOne(account)
    .then(function (foundAccount) {
      if (foundAccount) {
        onSuccess(foundAccount);
      } else {
        onFailure({
          statusCode: 402,
          message: "Error",
        });
      }
    })
    .catch(function (err) {
      onFailure({
        statusCode: 401,
        message: err,
      });
    });
}
