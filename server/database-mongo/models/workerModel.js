var mongoose = require("mongoose");
var workerSchema = mongoose.Schema({
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
  prof: String,
  rate: Number,
  password: {
    type: String,
    required: true
  },
  infos: String,
  prof: { type: mongoose.Schema.Types.ObjectId, ref: "Prof" }
});
var Worker = mongoose.model("Worker", workerSchema);
module.exports.Worker = Worker;
