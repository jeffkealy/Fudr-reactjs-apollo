MongoDB
db.dishes.updateMany( {}, { $rename: { "factual_id": "yelp_id" } } )
s
db.copyDatabase("fudr", "fudrV2")
db.getName()
db.dishes.find({yelp_id: "the-lowry-minneapolis"})


db.restaurants.getIndexes()
db.restaurants.dropIndex("factual_id_1")

db.getCollection('dishes').find({"yelp_id": "pyiNbsTflnKuuDwXKvi3JA"})
db.dishes.find(
    {
      yelp_id: "the-lowry-minneapolis"
    }
)


db.restaurant.createIndex( { "_id_ ": 1 }, { sparse: true } )
db.restaurants.ensureIndex({id: 1}, {sparse: true})

db.dishes.update({}, {$set : {"yelp_id":null}}, {upsert:false, multi:true})
