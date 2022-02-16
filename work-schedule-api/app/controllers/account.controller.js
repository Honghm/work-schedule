var Account = require('../models/account.model');
var crypto = require('crypto');
const config = require("../common/configs");

const client = require('twilio')(config.twilio.split('.')[0], config.twilio.split('.')[1]);

require('dotenv').config();


module.exports = {
    createAccount: createAccount,
    sendCode: sendCodeToPhoneNumber,
    verifyCode: verifyCodePhoneNumber
}

function sendCodeToPhoneNumber(phoneNumber, result) {
    return Account.findOne({ phoneNumber: `+${phoneNumber.trim()}` })
        .then(function (foundAccount) {
            console.log(foundAccount);
            if (foundAccount) {
                if (foundAccount.isValid == false) {
                    return client
                        .verify
                        .services(config.serviceID)
                        .verifications
                        .create({
                            to: `+${phoneNumber.trim()}`,
                            channel: "sms"
                        })
                        .then(() => {
                            result(null, {
                                statusCode: 200,
                            });
                        })
                        .catch((error) => {
                            console.error(error);
                            result({
                                statusCode: 409,
                                message: 'Error'
                            }, null);
                        });
                } else {
                    result({
                        statusCode: 400,
                        message: 'Phone number is existed'
                    }, null);
                }

            } else {
                return client
                    .verify
                    .services(config.serviceID)
                    .verifications
                    .create({
                        to: `+${phoneNumber.trim()}`,
                        channel: "sms"
                    })
                    .then(() => {
                        Account.create({
                            phoneNumber: `+${phoneNumber.trim()}`,
                            isValid: false,
                        })
                        result(null, {
                            statusCode: 200,
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                        result({
                            statusCode: 409,
                            message: 'Error'
                        }, null);
                    });
            }



        }).catch(function (err) {
            result(err, null);
        });

}

function verifyCodePhoneNumber(phoneNumber, code, result) {
    return client
        .verify
        .services(config.serviceID)
        .verificationChecks
        .create({
            to: `+${phoneNumber.trim()}`,
            code: code
        })
        .then((res) => {
            console.log(res);
            Account.updateOne({
                phoneNumber: `+${phoneNumber.trim()}`,
            }, {
                isValid: true,
            }, { runValidators: true })
                .then((data) => {
                    result(null, data);
                })
                .catch((err) => {
                    console.error(err);
                });

        })
        .catch((error) => {
            console.error(error);
            if (error.status == 404) {
                result({
                    statusCode: 400,
                    message: 'code isn\'t correct'
                }, null);
            } else {
                result({
                    statusCode: 409,
                    message: 'Error'
                }, null);
            }

        })
}

function createAccount(newAccount, result) {
    return Account.find({ phoneNumber: `${newAccount.phoneNumber.trim()}` })
        .then((foundAccount) => {
            console.log(foundAccount);
            if (foundAccount.length > 0 && foundAccount[0].isValid == true) {
                var hash = crypto.createHmac('sha256', process.env.SECRET_KEY)
                    .update(newAccount.password)
                    .digest('hex');
                Account.updateOne({
                    phoneNumber: newAccount.phoneNumber,
                }, { password: hash }, { runValidators: true })
                    .then(function (account) {
                        console.log(account);
                        return result(null, account);
                    })
                    .catch(err => {
                        console.log(err);
                        return result(err, null);
                    });
            } else {
                return result({
                    statusCode: 400,
                    message: 'Unverified phone number'
                }, null);
            }
        })
        .catch((err) => {
            console.log(err);
            return result(err, null);
        })

}
