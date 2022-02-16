var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var roleSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  created_at: { type: Date, required: true, default: Date.now },
});
var role = mongoose.model("roles", roleSchema);
module.exports = role;
