MongoDB
db.dishes.updateMany( {}, { $rename: { "factual_id": "yelp_id" } } )
DBQuery.shellBatchSize = 500;
db.copyDatabase("fudr", "fudrV2")

db.dishes.find({yelp_id: "the-lowry-minneapolis"})


db.restaurants.getIndexes()
db.restaurants.dropIndex("factual_id_1")
