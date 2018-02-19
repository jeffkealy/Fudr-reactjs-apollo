var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Create the Schema
var restaurantSchema = new Schema({

      factual_id: {type: String, unique:true},
      name: String,
      address:String

}, {strict: false});


  restaurantSchema.pre('save', function(next) {
    next();
  });

  // step 2 - create the model
  var Restaurant = mongoose.model('Restaurant', restaurantSchema);

  // step 3 - export our model
  module.exports = Restaurant;
