var jwt = require('./../utils/jwt');
var authController = require('../controllers/auth.controller');



exports.auth = function (role) {
    return function (req, res, next) {
        var authorizationHeader = req.headers['authorization'];
        var token = authorizationHeader.split(' ')[1];
        if (token) {
            jwt.verify(token, function (err, decodedData) {
                if (err) {
                    res.status(401);
                    res.json({
                        message: 'Invalid Token'
                    });
                } else {
                    if (role) {
                        if (decodedData.role.name == role) {
                            authController.checkAuth({
                                phoneNumber: decodedData.phoneNumber
                            })
                                .then(function (user) {
                                    req.user = user;

                                    next();
                                })
                                .catch(function (err) {

                                    res.status(401);
                                    res.json({
                                        message: 'Invalid Token, User not found'
                                    });
                                });
                        } else {
                            res.status(401);
                            res.json({
                                message: 'You cannot use this API'
                            });
                        }

                    } else {
                        authController.checkAuth({
                            phoneNumber: decodedData.phoneNumber
                        })
                            .then(function (user) {
                                req.user = user;

                                next();
                            })
                            .catch(function (err) {

                                res.status(401);
                                res.json({
                                    message: 'Invalid Token, User not found'
                                });
                            });
                    }

                }
            })
        } else {
            res.status(401);
            res.json({
                message: "Not Authorized"
            });
        }
    }
}


exports.dataToken = function (token, result) {
    jwt.verify(token, function (err, decodedData) {
        if (err) {
            result(err, null);
        } else {
            result(null, decodedData)
        }
    })
}