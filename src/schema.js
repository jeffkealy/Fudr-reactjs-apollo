export const typeDefs = `
  type Dish {
    id:ID!
    dishName: String
    photourl: String
    factual_id: String
    cuisinetype:[String]
    restaurant_id: String
  }
  type Restaurant{
    id: ID!
    name: String
  }
  type Query {
    dishes: [Dish]
    restaurants: [Restaurant]
  }
  type Mutation {
  addDish(id: String!, dishName: String!, photourl: String!, factual_id: String, restuarant_id: String): Dish
  }
`;
