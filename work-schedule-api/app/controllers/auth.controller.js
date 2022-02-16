var Account = require('../models/account.model');
var User = require('../models/user.model');
var crypto = require('crypto');
var jwt = require('../utils/jwt');
require('dotenv').config();

module.exports = {
    login: login,
    checkAuth: checkAuth
}


async function login(phoneNumber, password) {
    var hash = crypto.createHmac('sha256', process.env.SECRET_KEY)
        .update(password)
        .digest('hex');
       const user = await User.findOne({
            phoneNumber: phoneNumber
        });
    

    return Account.findOne({
            phoneNumber: phoneNumber,
            password: hash

        })
        .then(function(account) {
            if (account) {
                return new Promise(function(resolve, reject) {
                    jwt.sign({
                        phoneNumber: account.phoneNumber,
                        userId: user.id,
                        role: user.role,
                    }, function(err, token) {
                        if (err) {
                            return reject({
                                statusCode: 400,
                                message: err.message
                            });
                        } else {
                            return resolve({
                                token: token,
                                expires_in:process.env.TOKEN_EXPPIRES,
                                token_type: process.env.TOKEN_TYPE
                            });
                        }
                    })
                });

            } else {
                return Promise.reject({
                    statusCode: 400,
                    message: 'Phone number or password is incorrect'
                });
            }
        })
        .catch(function(err) {
            return Promise.reject({
                statusCode: 400,
                message: 'Phone number or password is incorrect'
            });
        })
}


function checkAuth(account) {
    return Account.findOne(account)
        .then(function(foundAccount) {
            if (foundAccount) {
                return Promise.resolve(foundAccount);
            } else {
                return Promise.reject({
                    message: 'Not Found'
                });
            }
        })
        .catch(function(err) {
            return Promise.reject(err);
        })
}
