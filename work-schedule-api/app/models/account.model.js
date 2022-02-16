var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
    password: {
        type: String,
        default: null
    },
    phoneNumber:{
        type: String,
        required:true
    },
    isValid: {
        type: Boolean,
        default:false
    },
    created_at    : { type: Date, required: true, default: Date.now }
})
var account = mongoose.model('accounts',accountSchema);
module.exports = account;