// dishes-3.js because we use it with server-3.js; grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a Schema
var leadersSchema = new Schema({
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
  designation: {
    type: String,
    required: true,
    unique: true
  },
  abbr: {
    type: String,
    required: true,
    unique: true
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
var Leaders = mongoose.model('leaders', leadersSchema);

// make this available to our Node applications
module.exports = Leaders;
