var jwt = require('jsonwebtoken');
var fs = require('fs');

var cert = fs.readFileSync(__dirname + '/key/key.pem');
var pub = fs.readFileSync(__dirname + '/key/key.pub');

require('dotenv').config();


exports.sign = function (obj, callback) {
    jwt.sign(obj, cert, {
        algorithm: 'RS256',
        expiresIn:process.env.TOKEN_EXPPIRES
    }, function (err, token) {
        callback(err, token);
    });
}

exports.verify = function (token, callback) {
     jwt.verify(token, pub, function (err, decoded) {
        callback(err, decoded);
    });
};
