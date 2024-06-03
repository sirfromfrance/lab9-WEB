var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var Favorites = require("../models/favorites");
var Verify = require("./verify");

var favoritesRouter = express.Router();
favoritesRouter.use(bodyParser.json());

favoritesRouter
  .route("/")

  .all(Verify.verifyOrdinaryUser)

  .get(function (req, res, next) {
    Favorites.find({ postedBy: req.decoded._doc._id })
      .populate("postedBy dishes")
      .exec(function (err, favorite) {
        if (err) throw err;
        res.json(favorite);
      });
  })

  .post(function (req, res, next) {
    var dishId = req.body._id;
    var userId = req.decoded._doc._id;

    var favoriteDishesData = {
      postedBy: userId,
      dishes: [dishId],
    };

    Favorites.findOne({ postedBy: userId }, function (err, favorite) {
      if (err) throw err;
      if (!favorite || favorite.length === 0) {
        Favorites.create(favoriteDishesData, function (err, favores) {
          if (err) throw err;
          console.log("A favorate dish has been created!");
          res.json(favores);
        });
      } else {
        if (favorite.dishes.indexOf(dishId) > -1) {
          res.json("This is allreayd in the favorite list!");
        } else {
          favorite.dishes.push(dishId);
          favorite.save(function (err, favores) {
            if (err) throw err;
            console.log("Added favorite dish!");
            res.json(favores);
          });
        }
      }
    });
  })

  .delete(function (req, res, next) {
    Favorites.remove({ postedBy: req.decoded._doc._id }, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

favoritesRouter
  .route("/:dishId")
  .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    var dishId = req.params.dishId;
    Favorites.findOne(
      { postedBy: req.decoded._doc._id, dishes: dishId },
      function (err, favores) {
        if (err) throw err;
        fav.dishes.remove(dishId);
        fav.save(function (err, favores) {
          if (err) throw err;
          console.log("Removed favorite from list!");
          res.json(fav);
        });
      }
    );
  });

module.exports = favoritesRouter;
