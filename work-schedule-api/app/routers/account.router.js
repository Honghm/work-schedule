var router = require("express").Router();
var auth = require("../middle-ware/auth");
var accountController = require("../controllers/account.controller");

router.post("/create", createAccount);
router.get("/sendCode", sendCodeToPhoneNumber);
router.get("/verifyCode", verifyCodePhoneNumber);
router.get("/", auth.auth(), getInfoUser);
module.exports = router;

function sendCodeToPhoneNumber(req, res) {
  accountController.sendCode(req.query.phoneNumber, res);
}
function verifyCodePhoneNumber(req, res) {
  accountController.verifyCode(req.query.phoneNumber, req.query.code, res);
}
function createAccount(req, res) {
  var result = verifyInputAccount(req.body, (error) => {
    next({
      message: error,
    });
  });

  if (result) {
    accountController.createAccount(req.body, res);
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



function getInfoUser(req, res) {
  var authorizationHeader = req.headers["authorization"];
  var token = authorizationHeader.split(" ")[1];

  auth.dataToken(token, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      accountController.getInfoUser(data.userId, req, res);
    }
  });
}
