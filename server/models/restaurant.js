var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;



// Create the Schema
var restaurantSchema = new Schema({

  // name: String,
  id: { type: String, unique: true },
  // is_claimed: Boolean,
  // is_closed: Boolean,
  // url: String,
  // phone: String,
  // display_phone: String,
  // review_count: Number,
  // categories: [],
  // rating: Number,
  // price: String,
  // location: {Location: {
  //   address1: String,
  //   address2: String,
  //   address3: String,
  //   city: String,
  //   state: String,
  //   zip_code: String,
  //   country: String,
  //   formatted_address: String
  // }},
  // coordinates: {Coordinates:{
  //   latitude: Number,
  //   longitude: Number,
  // }},
  // photos: [String],
  // hours: [],
  // reviews: [],
  // distance: Number

}, {strict: false});


  restaurantSchema.plugin(uniqueValidator).pre('save', function(next) {
    next();
  });
  // restaurantSchema.plugin(uniqueValidator)
  // step 2 - create the model
  var Restaurant = mongoose.model('Restaurant', restaurantSchema);

  // step 3 - export our model
  module.exports = Restaurant;
