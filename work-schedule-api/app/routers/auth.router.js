var router = require('express').Router();
var authController = require('../controllers/auth.controller');

router.post('/', login);

module.exports = router;

function login(req, res, next) {
    var phoneNumber = req.body.phoneNumber;
    var password = req.body.password;
    if (!phoneNumber) {
        next({
            statusCode: 400,
            message: "Phone Number is required"
        })
    } else if (!password) {
        next({
            statusCode: 400,
            message: "Password is required"
        })
    } else {
        authController.login(phoneNumber, password)
            .then(function (token) {
                res.send(token)
            })
            .catch(function (err) {
                next(err);
            })
    }
}
