var mongoose = require("mongoose");
var profSchema = mongoose.Schema({
  name: String,
  img: String
});
var Prof = mongoose.model("Prof", profSchema);
module.exports.Prof = Prof;
