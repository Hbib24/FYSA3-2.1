var mongoose = require("mongoose");

var offerSchema = mongoose.Schema({
  worker_id: { type: mongoose.Schema.Types.ObjectId, ref: "Worker" },
  title: String,
  desc: String,
  dates: Array
});
var Offer = mongoose.model("Offer", offerSchema);
module.exports.Offer = Offer;
