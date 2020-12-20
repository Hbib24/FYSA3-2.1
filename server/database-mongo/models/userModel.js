var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  first_name: String,
  last_name: String,
  email: String,
  phone: Number,
  location: String,
  password: {
    type: String,
    required: true
  }
});
var User = mongoose.model("User", userSchema);
module.exports.User = User;
