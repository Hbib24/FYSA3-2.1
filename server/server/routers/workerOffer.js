var express = require("express");
var offer = require("../../database-mongo/index");

var router = express.Router();

router.route("/worker/offer").post((req, res) => {
  offer.insertOffer(req.body).then((data) => {
    res.send(data);
    res.end();
  });
});

router.route("/worker/offer").get((req, res) => {
  offer.getAllOffers().then((data) => {
    res.send(data);
    res.end();
  });
});

router.route("/worker/offer/:id").get((req, res) => {
  offer.getOffersByWorkerId(req.params.id).then((data) => {
    res.send(data);
    res.end();
  });
});

router.route("/worker/offer/:id").delete((req, res) => {
  offer.deleteOfferById(req.params.id).then(() => {
    res.end();
  });
});

module.exports = router;
