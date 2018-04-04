var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');


// Create the Schema
var dishSchema = new Schema({

    dishName: String,
    photourl: String,
    photourlHash: String,
    cuisinetype:[],
    yelp_id: String,
    restaurant_id: String


});



dishSchema.plugin(mongoosePaginate)


//look at antoinettes mongo
dishSchema.pre('save', function(next) {
  next();
});

// step 2 - create the model
var Dish = mongoose.model('Dish', dishSchema);

// step 3 - export our model
module.exports = Dish;
