var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var favoritesSchema = new Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
},
  dishes:[{ // will return an array of favorite dishes
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dish"
  }],
}, {
    timestamps: true
});
// the schema is useless so far
// we need to create a model using it
var Favorites = mongoose.model('Favorite', favoritesSchema);

// make this available to our Node applications
module.exports = Favorites;
