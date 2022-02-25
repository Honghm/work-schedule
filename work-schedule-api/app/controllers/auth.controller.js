var AuthService = require("../services/auth.service");
require("dotenv").config();

module.exports = {
  login: login,
  checkAuth: checkAuth,
};

async function login(phoneNumber, password, res) {
  try {
    AuthService.login(
      phoneNumber,
      password,
      function onSuccess(result) {
        res.status(200).json(result);
      },
      function onFailure(err) {
        res.status(err.statusCode).json(err);
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
}

function checkAuth(account,res) {
  try {
    AuthService.checkAuth(
      account,
      function onSuccess(result) {
        res.status(200).json(result);
      },
      function onFailure(err) {
        res.status(err.statusCode).json(err);
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
}
