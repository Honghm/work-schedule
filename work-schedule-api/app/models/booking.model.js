var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// var itemBookingSchema = new Schema({
//     date: String,
//     morning: String,
//     afternoon: String,
//     note:String
// })

var bookingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  data: {
    type: Schema.Types.Object,
    of: {
      date: String,
      morning: String,
      afternoon: String,
      note: String,
    },
    created_at: { type: Date, required: true, default: Date.now },
  },
});

var booking = mongoose.model("bookings", bookingSchema);

module.exports = booking;
