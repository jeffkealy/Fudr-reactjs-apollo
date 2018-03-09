import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';


const typeDefs = `


  type DishesConnection{
    pageInfo: PageInfo
    edges:[DishEdge]
    totalCount: Int
    dishes: [Dish]

  }
  type PageInfo{
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }
  type DishEdge{
    node: [Dish]
    cursor: String!
  }
  type Dish{
    _id:String
    dishName: String
    photourl: String
    yelp_id: String
    cuisinetype:[String]
    restaurant_id: String
  }
  input DishInput{
    _id: String
    dishName: String!
    photourl: String!
    yelp_id: String
    cuisinetype:[String]
    restaurant_id: String
  }
  type Restaurant{
    _id: String
    name: String
    address: String
    locality:String
    region:String
    postcode:String
  }
  type Business{
    id: String
    name: String
    rating: Float
    url: String
    phone: String
    location: Location
  }
  type SearchRestaurant{
    business: [Business]
  }
  type Location{
    address1: String
    city: String
    state: String
    zip_code: String
    formatted_address: String
  }
  type Query {
    allDishes (needMoreDishes: Boolean, after: String, first: Int, before: String,last: Int): [Dish]
    dish( _id: String): Dish
    restaurant(_id:String): Restaurant
    business(id:String):Business
    searchRestaurant(term: String, location: String): SearchRestaurant
    dishesByYelpId(yelp_id: String ): [Dish]
  }
  type Mutation {
  newDish(input:DishInput): Dish
  updateDish(input:DishInput):Dish

  }
  type Subscription{
    updateDish(_id: String!, dishName: String!, photourl: String!, yelp_id: String, restuarant_id: String): Dish
  }
`;

const schema = makeExecutableSchema({typeDefs, resolvers});

export {schema};

//    SearchRestaurant(term: String): searchRestaurant




// type DishesConnection{
//   pageInfo: PageInfo!
//   edges:[DishEdge]
//   totalCount: Int
//   dishes: [Dish]
//
// }
//
// type DishEdge{
//   node: Dish
//   cursor: String!
// }
//
// type PageInfo{
//   hasNextPage: Boolean!
//   hasPreviousPage: Boolean!
//   startCursor: String
//   endCursor: String
// }
