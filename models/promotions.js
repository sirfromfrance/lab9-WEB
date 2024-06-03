// dishes-3.js because we use it with server-3.js; grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

/*
var commentSchema = new Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
   author: {
     type: String,
     required: true
   }
}, {
  timestamps: true
});
*/
// create a Schema
var promoSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false
  },
  image: {
    type: String,
    required: true,
    unique: true
  },
  label: {
    type: String,
    required: false,
    default: "",
    unique: true
  },
  price: {
    type: Currency,
    required: true,
    unique: false
  },
  description: {
    type: String,
    required: true
},
}, {
  timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Promotions = mongoose.model('promo', promoSchema);

// make this available to our Node applications
module.exports = Promotions;
