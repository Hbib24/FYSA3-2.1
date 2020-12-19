var express = require("express");
var offer = require("../../database-mongo/index");

var router = express.Router();

router.route("/worker/offer").post(function (req, res) {
  offer.insertOffer(req.body).then((data) => {
    res.send(data);
    res.end();
  });
});

router.route("/worker/offer").get(function (req, res) {
  offer.getAllOffers().then((data) => {
    res.send(data);
    res.end();
  });
});

module.exports = router;
