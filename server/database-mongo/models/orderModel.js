var mongoose = require("mongoose");

var orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  offer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Offer"
  },
  info: String,
  date: String,
  state: String,
  location: String
});
var Order = mongoose.model("Order", orderSchema);

module.exports.Order = Order;
