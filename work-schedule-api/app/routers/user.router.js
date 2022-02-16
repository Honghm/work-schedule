var router = require("express").Router();
var userController = require("../controllers/user.controller");
var auth = require("../middle-ware/auth");

router.get("/", auth.auth(), getInfoUser);
router.post("/avatar", auth.auth(), uploadAvatar);

module.exports = router;

function uploadAvatar(req, res) {
  var authorizationHeader = req.headers["authorization"];
  var token = authorizationHeader.split(" ")[1];
  auth.dataToken(token, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (!req.files) {
        return res.status(400).send("No files were uploaded");
      }
      let file = req.files.file;
      userController.uploadAvatar(data.userId, file, req, res);
    }
  });
}


function getInfoUser(req, res) {
  var authorizationHeader = req.headers["authorization"];
  var token = authorizationHeader.split(" ")[1];

  auth.dataToken(token, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      userController.getInfoUser(data.userId, req, res);
    }
  });
}
