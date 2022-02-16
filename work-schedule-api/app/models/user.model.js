var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  accountId: {
    type: Schema.Types.ObjectId,
  },
  managerId: {
    type: Schema.Types.Object,
    default: null,
  },
  phoneNumber: {
    type: String,
  },
  username: {
    type: String,
    default: null,
  },
  avatar: {
    type: String,
    default: null,
  },
  role: {
    type: Schema.Types.Object,
    default: null,
  },
  department: {
    type: Schema.Types.Object,
    default: null,
  },
  created_at: { type: Date, required: true, default: Date.now },
});
var user = mongoose.model("users", userSchema);
module.exports = user;
