var router = require("express").Router();
var Account = require("../models/account.model");
var userController = require("../controllers/user.controller");
var accountController = require("../controllers/account.controller");

router.post("/create", createAccount);
router.get("/sendCode", sendCodeToPhoneNumber);
router.get("/verifyCode", verifyCodePhoneNumber);
module.exports = router;

function sendCodeToPhoneNumber(req, res) {
  accountController.sendCode(req.query.phoneNumber, function (err, result) {
    if (err) {
      if (err.statusCode == 404) {
        res.status(404).send(err);
      } else if (err.statusCode == 400) {
        res.status(400).send(err);
      } else {
        res.status(409).send(err);
      }
    } else {
      res.status(200).send({
        message: result,
      });
    }
  });
}
function verifyCodePhoneNumber(req, res) {
  accountController.verifyCode(
    req.query.phoneNumber,
    req.query.code,
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send({
          message: "Phone number is validated",
        });
      }
    }
  );
}
function createAccount(req, res, next) {
  var result = verifyInputAccount(req.body, (error) => {
    next({
      message: error,
    });
  });
  if (result) {
    var account = new Account(req.body);
    accountController.createAccount(account, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        var result = userController.createUser(req.body, account);
        if (result) {
          res.json({
            message: "Successfully created account",
          });
        } else {
          res.send(err);
        }
      }
    });
  }
}

function verifyInputAccount(account, res) {
  if (!account.phoneNumber) {
    res({
      message: "phoneNumber is required",
    });
    return false;
  } else if (!account.password) {
    res({
      message: "password is required",
    });
    return false;
  } else if (!account.roleId) {
    res({
      message: "roleId is required",
    });
    return false;
  } else if (!account.departmentId) {
    res({
      message: "departmentId is required",
    });
    return false;
  }

  return true;
}
