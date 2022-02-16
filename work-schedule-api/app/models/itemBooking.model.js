var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const itemBookingSchema = new Schema({
    date: String,
    morning: String,
    afternoon: String,
    note:String
})
 var itemBooking = mongoose.model('itemBooking', itemBookingSchema);
 
module.exports = itemBooking;