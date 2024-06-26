var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var Leaders = require("../models/leaders");
var Verify = require("./verify");
var users = require("./users");

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
leaderRouter
  .route("/")

  .get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Leaders.find({}, function (err, leader) {
      if (err) throw err;
      res.json(leader);
    });
  })

  .post(
    Verify.verifyOrdinaryUser,
    Verify.verifyAdmin,
    function (req, res, next) {
      Leaders.create(req.body, function (err, leader) {
        if (err) throw err;
        console.log("Leader Created");
        var id = leader._id;

        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Added a leader with id: " + id);
      });
    }
  )

  .delete(
    Verify.verifyOrdinaryUser,
    Verify.verifyAdmin,
    function (req, res, next) {
      Leaders.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
      });
    }
  );

leaderRouter
  .route("/:leaderId")

  .get(function (req, res, next) {
    Leaders.findById(req.params.promoId, function (err, leader) {
      if (err) throw err;
      res.json(leader);
    });
  })

  .put(function (req, res, next) {
    Leaders.findByIdAndUpdate(
      req.params.leaderId,
      {
        $set: req.body,
      },
      {
        new: true,
      },
      function (err, leader) {
        if (err) throw err;

        res.json(leader);
      }
    );
  })

  .delete(function (req, res, next) {
    Leaders.findByIdAndRemove(req.params.leaderId, function (err, resp) {
      if (err) throw err;

      res.json(resp);
    });
  });

module.exports = leaderRouter;
