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
    _id:ID!
    dishName: String
    photourl: String
    factual_id: String
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
  type Query {
    allDishes (needMoreDishes: Boolean, after: String, first: Int, before: String,last: Int): [Dish]
    Dish( _id: String): Dish
    restaurant(_id:String): Restaurant
  }
  type Mutation {
  addDish(_id: String!, dishName: String!, photourl: String!, factual_id: String, restuarant_id: String): Dish
}
`;

const schema = makeExecutableSchema({typeDefs, resolvers});

export {schema};

//
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
