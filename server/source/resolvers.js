import {createApolloFetch} from 'apollo-fetch'


const uri = 'https://api.yelp.com/v3/graphql';
const apolloFetch = createApolloFetch({uri});


export const resolvers = {
  Query: {
    allDishes: async (root, args, { Dish }) => {
      // DishesConnection: {
      //   pageInfo: {
      //     hasNextPage: true;
      //     hasPreviousPage: false;
      //     startCursor: "dtring";
      //     endCursor: "ftring";
      //   },
        dishes: {
          try{
            console.log("START");

            const dishes = await Dish.find();

            let dishesCopy = dishes.slice().sort(function(){return .5 - Math.random()});
            let dishesToSend = dishes.slice(0, 10);
            dishesCopy.splice(0, 10)
            console.log(dishesCopy.length, "dishes");
            console.log("END");
            return dishesToSend.map((x) => {
              x._id = x._id.toString();
              return x;
            });
          } catch(e){
            console.log("error :dishes query");
          }
        // }
      }

    },
    dish: async (root, args, {Dish}) =>{
      try{
        const dish = await Dish.findById(args._id);
        console.log(dish);
        return dish
      } catch(e){
        console.log("error: dish query");
      }
    },
    restaurant: async (root, args, {Restaurant}) =>{
      try{
        console.log("RESTAURANT");
        const restaurant = await Restaurant.findById(args._id);
        // console.log(restaurant);
        return restaurant
      } catch(e){
        console.log("error: restaurant query");
      }
    },
    business: (root, args, {Business} )=> {
      let query =
              `{
                business(id: "${args.id}") {
                    id
                    name
                    rating
                    url
                    phone
                    location{
                      address1
                    }

                }
              }`;
       apolloFetch.use(({ request, options }, next) => {
        if (options.headers) {
          console.log("Header already set");
        }else{
          options.headers = {Authorization: `Bearer ${process.env.YAPI}`}
        }
        // options.headers['Authorization'] = `Bearer ${process.env.YAPI}`;
        // options.headers['content-type'] = 'application/graphql';
        console.log("headers", options.headers);
        next();
       });
       return apolloFetch({ query }) //all apolloFetch arguments are optional
        .then(result => {
          const { data, errors, extensions } = result;
          console.log("then", data.business);
          return data.business
          //GraphQL errors and extensions are optional
        })
        .catch(error => {
          console.log(error);
          //respond to a network error
        });
    },
    searchRestaurant: (root, args, {SearchRestaurant})=>{
      console.log('ARGS', args);
      const apolloFetch = createApolloFetch({uri});
      let query = `
      {
        search(term: "${args.term}", location: "${args.location}", limit: 5){
          business{
            id
            name
            phone
            location{
              address1
              city
              state
              zip_code
              formatted_address
            }
          }
        }
      }`
      apolloFetch.use(({ request, options }, next) => {
       if (options.headers) {
         console.log("Header already set");
       }else{
         options.headers = {Authorization: `Bearer ${process.env.YAPI}`}
         console.log("set header ");

       }
       next();
      });

       return apolloFetch({ query }) //all apolloFetch arguments are optional
        .then(result => {
          const { data, errors, extensions } = result;
          console.log("then", data.search.id);
          return data.search
          //GraphQL errors and extensions are optional
        })
        .catch(error => {
          console.log("Error",error);
          //respond to a network error
        });
    },
  },
  Mutation: {
    addDish: (root, { input }, { Dish }) => {
      const newDish = new Dish(input)
      return new Promise((resolve, object) => {
        newDish.save((err) => {
          if(err) reject(err)
          else resolve(newDish)
         console.log("Dish added", newDish);
        })
      })
    },
    updateDish: (root, {input}, {Dish}) =>{
      return new Promise((resolve, object) => {
        console.log("findOneAndUpdate", input);
        Dish.findOneAndUpdate({ _id: input._id }, input, {new:true},(err, dish) => {
          if(err) reject(err)
          else {resolve(dish)
            console.log("dish updated");
            console.log(dish);
          }
        })
      })
    },
    // addDish: async (root, args, { Dish }) => {
    //   console.log("adddish mutation", args);
    //   const dish = await new Dish(args.input).save();
    //   dish._id = dish._id.toString();
    //   return dish;
    // },
    // updateDish: async (root, { input }, {  Dish }) => {
    //   // { _id: 123123, name: "whatever"}
    //   console.log("findOneAndUpdate", input);
    //   const dish = await Dish.findOneAndUpdate({ _id: input._id }, Dish);
    //   const dishToSend = dish.toString();
    //   console.log("dish", dish);
    //
    //   return dishToSend;
    // },

  },
  Subscription:{
    updateDish: async (root, args, { Dish }) => {
      // { _id: 123123, name: "whatever"}
      const dish = await new Dish(args).save();
      dish._id = dish._id.toString();
      return dish;
    },
  },
};
