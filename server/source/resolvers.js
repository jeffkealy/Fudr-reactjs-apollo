import {createApolloFetch} from 'apollo-fetch'


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

            const dishes = await Dish.find();

            let dishesCopy = dishes.slice().sort(function(){return .5 - Math.random()});
            // let dishesToSend = dishes.slice(dishes.length-10, dishes.length);
            let dishesToSend = dishes.slice(0,10);

            dishesCopy.splice(0, 10)
            // console.log(dishesToSend, "dishes");
            console.log("dishes query");


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
    dishesByYelpId: async (root, args, {Dish}) =>{
      try{
        const dishes = await Dish.find({'yelp_id':args.yelp_id});
        console.log("dishesByYelpId");
        return dishes.map((x) => {
          x._id = x._id.toString();
          return x;
        });
      } catch(e){
        console.log("error: dish query");
      }
    },
    restaurant: async (root, args, {Restaurant}) =>{
      try{
        // console.log("restaurant Query", args);
        const restaurant = await Restaurant.find({'yelp_id':args.yelp_id});
        console.log(restaurant);
        return restaurant
      } catch(e){
        console.log("error: restaurant query");
      }
    },

    business: (root, args, {Business} )=> {
      const uri = 'https://api.yelp.com/v3/graphql';
      let apolloFetch = createApolloFetch({uri});
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
      const uri = 'https://api.yelp.com/v3/graphql';

      let apolloFetch = createApolloFetch({uri});

      let query = `
      {
        search(term: "${args.term}", location: "${args.location}", limit: 5){
          business  {
            name
            id
            is_claimed
            is_closed
            url
            phone
            display_phone
            review_count
            categories{
              title
              alias
            }
            rating
            price
            location{
              address1
              address2
              address3
              city
              state
              zip_code
              country
              formatted_address
            }
            coordinates{
              latitude
              longitude
            }
            photos
            hours {
              hours_type
              open{
                is_overnight
                end
                start
                day
              }
              is_open_now
            }
            distance
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
       // console.log("searchRestaurant request", request);
       next();
      });

       return apolloFetch({ query }) //all apolloFetch arguments are optional
        .then(result => {
          const { data, errors, extensions } = result;
          console.log("searchRestaurant then", data.search.business[0].id);
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
        console.log("INPUT newDish", input);
        const uri = 'https://api.imgur.com/3/image';
        let apolloFetch = createApolloFetch({ uri });
        let body = { image: input.photourl,
               album: 'x7QFo',
               name: input.dishName
             }

             // input.photourl
        apolloFetch.use(({ request, options }, next) => {
         if (options.headers) {
           console.log("imgur Header already set");
         }else{
           options.headers = {Authorization: `Bearer ${process.env.imguraccessToken}`}
           console.log("imgur set header  ");
         }
         options.body = JSON.stringify(body)
         console.log("options",options);

         next();

        });
        return apolloFetch() //Post Image to imgur api
        .then(result => {
          const { data, errors, extensions } = result;
          console.log("imgur result", result);
          if (result.data.link) {
            input.photourl = result.data.link
            input.photourlHash = result.data.id
          }

          if (result.data.error) {
            if (result.data.error.code === 1003) {
              console.log("1003 error", result.data.error.message);
              input.photourl = result.data.error.message
            } else if (!input.photourl) {
              console.log(result.data.error.message);
              input.photourl = "No Photo URL Entered"
            } else {
              console.log("else");
              console.log(result.data.error);
              input.photourl = result.data.error
            }
          }
          delete input._id;
          console.log("addDish to mongo", input);
          const newDish = new Dish(input)
          return new Promise((resolve, reject,  object) => {
            newDish.save((err) => {
              if(err) {
                console.log("addDish Error", err);
                reject(err)
              }
              else {
                resolve(newDish)
                console.log("Dish added", newDish);
              }
            })
          })

        })
        .catch(error => {
          console.log("Error",error);
          //respond to a network error
        });

    },
    newRestaurant: (root, { input }, { Restaurant }) => {
      console.log("newRestaurant, INPUT ", input);
      // try{
      //   // console.log("restaurant Query", args);
      //   const restaurant = await Restaurant.find({'yelp_id':input._id});
      //   console.log(restaurant);
      //   return restaurant
      // } catch(e){
      //   console.log("error: restaurant query");
      // }
      //
      const newRestaurant = new Restaurant(input)
      return new Promise((resolve, reject, object) => {
        newRestaurant.save((err) => {
          if(err){
           if (err.errors.name = "ValidatorError") {
              console.log("Error, expected `id` to be unique. Will send restaurant", newRestaurant)
              console.log("err", err);
              resolve(newRestaurant)
            }else {
              console.log("ERROR: newRestaurant ", err);
              reject(err)
            }
          }
          else {
            resolve(newRestaurant)
            console.log("Business added", newRestaurant);
          }
        })
      })
    },
    updateDish: (root, {input}, {Dish}) =>{
      console.log("updateDish, INPUT:", input);
      //add image to imgur
      const deleteId = input.photourlHash;
      const uri = 'https://api.imgur.com/3/image';
      let apolloFetch = createApolloFetch({ uri });
      let body = { image: input.photourl,
             album: 'x7QFo',
             name: input.dishName
           }
      apolloFetch.use(({ request, options }, next) => {
       if (options.headers) {
         console.log("imgur Header already set");
       }else{
         options.headers = {Authorization: `Bearer ${process.env.imguraccessToken}`}
         console.log("imgur set header  ");
       }
       options.body = JSON.stringify(body)
       console.log("options",options);

       next();

      });
      return apolloFetch() //Post image to imgur api
      .then(result => {
        const { data, errors, extensions } = result;
        console.log("Input work in result ", input);
        const newImage = result
        console.log("imgur Post image result", newImage);
        if (result.data.id) {
          input.photourl = result.data.link
          input.photourlHash = result.data.id
          console.log("photourl and hash set to new imgur image");
        }
        //error handling
        if (result.data.error) {
          console.log("error handling");
          if (result.data.error.code === 1003) {
            console.log(result.data.error.message);
            input.photourl = result.data.error.message
          } else if (!input.photourl) {
            console.log(result.data.error.message);
            input.photourl = "No Photo URL Entered"
          } else {
            console.log("other error",result.data.error);
            input.photourl = result.data.error
          }
        }
        //if theres a photo to update, deleted the old one
        if (deleteId) {
          console.log("deleteDish hash to delete...", deleteId);
          console.log("input.photourlHash hash to delete...", input.photourlHash);

          const uri = 'https://api.imgur.com/3/image/' + deleteId;
          let apolloFetch = createApolloFetch({ uri });
          apolloFetch.use(({ request, options }, next) => {
             if (options.headers) {
               console.log("imgur Header already set");
             }else{
               options.headers = {Authorization: `Bearer ${process.env.imguraccessToken}`}
               console.log("imgur set header  ");
             }
             options.method = 'DELETE'
             console.log("options",options);

             next();
           });
           return apolloFetch() //delete image on imgur
           .then(result => {
             console.log("updateDish Deleted image from imgur", result);
             console.log("deleted dish...", input);
             const newDish = new Dish(input)
             return new Promise((resolve, object) => {
               console.log("findOneAndUpdate");
               Dish.findOneAndUpdate({ _id: input._id }, input, {new:true},(err, dish) => {
                 if(err) reject(err)
                 else {resolve(dish)
                   console.log("dish updated");
                   console.log(dish);
                 }
               })
             })

           })
           .catch(error => {
             console.log("Delete Error",error);
             //respond to a network error
           });
        } else {
          console.log("Else newImage", newImage);
          console.log("EditDish Dish", input);
          const newDish = new Dish(input)
          return new Promise((resolve, object) => {
            console.log("findOneAndUpdate", input);
            Dish.findOneAndUpdate({ _id: input._id }, input, {new:true},(err, dish) => {
              if(err) reject(err)
              else {
                resolve(dish)
                console.log("dish updated");
                console.log(dish);
              }
            })
          })
        }


      })
      .catch(error => {
        console.log("Error",error);
        //respond to a network error
      });



    },
    deleteDish: (root, args, {Dish}) => {
      console.log("deleteDish deleting...", args);
      let deleteId = args.photourlHash
      const uri = 'https://api.imgur.com/3/image/' + deleteId;
      let apolloFetch = createApolloFetch({ uri });
      apolloFetch.use(({ request, options }, next) => {
         if (options.headers) {
           console.log("imgur Header already set");
         }else{
           options.headers = {Authorization: `Bearer ${process.env.imguraccessToken}`}
           console.log("imgur set header  ");
         }
         options.method = 'DELETE'
         console.log("options",options);

         next();
       });
       return apolloFetch()
       .then(result => {
         console.log("deleteDish fetch results", result);
         return new Promise((resolve, object) => {
             Dish.remove({ _id: args._id}, (err, res) => {
                 if (err) {
                   reject(err)
                   console.log(err);
                 }
                 else {
                   resolve(res)
                   console.log("deleted");
                 }
             })
         })
       })
       .catch(error => {
         console.log("Delete Error",error);
         //respond to a network error
       });

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
