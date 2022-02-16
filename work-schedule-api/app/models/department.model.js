var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var departmentSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required:true
    },
    created_at    : { type: Date, required: true, default: Date.now }
})
var department = mongoose.model('departments',departmentSchema);
module.exports = department;