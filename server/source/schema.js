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
    photourlHash: String
    yelp_id: String
    cuisinetype:[String]
    restaurant_id: String
  }

  #Dish INPUT

  input DishInput{
    _id: String
    dishName: String!
    photourl: String!
    photourlHash: String
    yelp_id: String!
    cuisinetype:[String]
    restaurant_id: String!
  }

  #DishEditInput

  input DishEditInput{
    _id: String!
    dishName: String!
    photourl: String!
    photourlHash: String
    restaurant_id: String
    yelp_id: String
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
    _id: String
    name: String
    id: String
    is_claimed: Boolean
    is_closed: Boolean
    url: String
    phone: String
    display_phone: String
    review_count: Int
    categories: [Category]
    rating: Float
    price: String
    location: Location
    coordinates: Coordinates
    photos: [String]
    hours: [Hours]
    reviews(limit: Int, offset: Int): [Review]
    distance: Float
  }
    type Category{
      title: String
      alias: String
    }
    type Location{
      address1: String
      address2: String
      address3: String
      city: String
      state: String
      zip_code: String
      country: String
      formatted_address: String
    }
    type Coordinates{
      latitude: Float
      longitude: Float
    }
    type Hours{
      hours_type: String
      open: [OpenHours]
      is_open_now: Boolean
    }
      type OpenHours{
        is_overnight: Boolean
        end: String
        start: String
        day: Int
      }
    type Review{
      rating: Int
      user: User
      text: String
      time_created: String
      url: String
    }
      type User {
        image_url: String
        name: String
      }



#Business input

      input BusinessInput{
        categories: [CategoryInput]
        coordinates: CoordinatesInput
        display_phone: String
        distance: Float
        hours: [HoursInput]
        id: String
        is_claimed: Boolean
        is_closed: Boolean
        location: LocationInput
        name: String
        phone: String
        photos: [String]
        price: String
        rating: Float
        review_count: Int
        reviews: [ReviewInput]
        url: String
      }
        input CategoryInput{
          title: String
          alias: String
        }
        input CoordinatesInput{
          latitude: Float
          longitude: Float
        }
        input LocationInput{
          address1: String
          address2: String
          address3: String
          city: String
          state: String
          zip_code: String
          country: String
          formatted_address: String
        }

        input HoursInput{
          hours_type: String
          open: [OpenHoursInput]
          is_open_now: Boolean
        }
          input OpenHoursInput{
            is_overnight: Boolean
            end: String
            start: String
            day: Int
          }
        input ReviewInput{
          rating: Int
          user: UserInput
          text: String
          time_created: String
          url: String
        }
          input UserInput {
            image_url: String
            name: String
          }




  type SearchRestaurant{
    business: [Business]
  }

  type Query {
    allDishes (needMoreDishes: Boolean, after: String, first: Int, before: String,last: Int): [Dish]
    dish( _id: String): Dish
    restaurant(_id:String): Business
    business(id:String):Business
    searchRestaurant(term: String, location: String): SearchRestaurant
    dishesByYelpId(yelp_id: String ): [Dish]
  }
  type Mutation {
  addDish(input:DishInput): Dish
  newRestaurant(input:BusinessInput): Business
  updateDish(input:DishEditInput):Dish
  deleteDish(_id: String, photourlHash: String): Dish

  }
  type Subscription{
    updateDish(_id: String!, dishName: String!, photourl: String!, yelp_id: String, restaurant_id: String): Dish
  }
`;

const schema = makeExecutableSchema({typeDefs, resolvers});

export {schema};
