// dishes-3.js because we use it with server-3.js; grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

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

// create a Schema
var dishSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true,
    unique: true
  },
  category: {
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
  comments:[commentSchema]
}, {
  timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Dishes = mongoose.model('Dish', dishSchema);

// make this available to our Node applications
module.exports = Dishes;
