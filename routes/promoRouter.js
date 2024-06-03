// The promoRouter module
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Promotions = require('../models/promotions');
var Verify = require('./verify');
var users = require('./users');

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());
promoRouter.route('/')
// no ; because we chain all the REST together
.get(function(req,res,next) {
  Promotions.find({}, function (err, promo) {
    if (err) throw err;
    res.json(promo); // the json method on the res will return a javascript object
  });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req,res,next) {
  Promotions.create(req.body, function(err, promo) {
    if(err) throw err;
    console.log('Promotion Created');
    var id = promo._id;

    res.writeHead(200, { 'Content-Type': 'text/plain'
    });
    res.end('Added Promotion with id: ' + id);
  });

})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req,res,next) {
  Promotions.remove({}, function(err, resp) { // resp is a javascript object ...
    if(err) throw err;
    res.json(resp); //...that tells me how many dishes have been deleted
  });
}); // a semicolon ; here!

    promoRouter.route('/:promoId')
    .get(function(req,res,next){
          Promotions.findById(req.params.promoId, function(err, promo) {
            if(err) throw err;
            res.json(promo);
          });
  })

  .put(function(req, res, next){
      Promotions.findByIdAndUpdate(req.params.promoId, {
          $set: req.body
      }, {
          new: true
      }, function (err, promo) {
          if(err) throw err;
          res.json(promo);
    });
})

.delete(function(req, res, next){

  Promotions.findByIdAndRemove(req.params.promoId, function(err, resp) {
    if(err) throw err;

    res.json(resp);
  });

});


module.exports = promoRouter;
