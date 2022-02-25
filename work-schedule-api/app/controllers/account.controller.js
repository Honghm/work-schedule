var AccountService = require("../services/account.service");

module.exports = {
  createAccount: createAccount,
  sendCode: sendCodeToPhoneNumber,
  verifyCode: verifyCodePhoneNumber,
  getInfoUser:getInfoUser
};

function sendCodeToPhoneNumber(phoneNumber, res) {
  try {
    AccountService.sendCode(
      phoneNumber,
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

function verifyCodePhoneNumber(phoneNumber, code, res) {
  try {
    AccountService.verifyCode(
      phoneNumber,
      code,
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

function createAccount(newAccount, res) {
  try {
    AccountService.createAccount(
      newAccount,
      function onSuccess(result) {
        res.status(200).json(result);
      },
      function onFailure() {
        res.status(err.statusCode).json(err);
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
  
}

async function getInfoUser(userId, req, res) {
  try {
    const user = await AccountService.getInfoUser(userId);
    res.status(200).json({
      data: user,
    });
  } catch (error) {
    res.status(400);
  }
}

