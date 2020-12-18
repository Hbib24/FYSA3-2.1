var express = require("express");
var insertOffer = require("../../database-mongo/index");

var router = express.Router();

router.route("/worker/offer").post(function (req, res) {
  insertOffer.insertOffer(req.body).then((data) => {
    res.send(data);
  });
});

module.exports = router;
