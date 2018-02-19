// export const resolvers = {
//   Query: {
//     dishes: () => {
//       return dishes;
//     },
//   },
//   Mutation: {
//     addDish: (root, args) => {
//       const newDish = { id: args.id, dishName: args.dishName, photourl: args.photourl};
//       dishes.push(newDish);
//       return newDish;
//     }
//   }
// };

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
            let dishesToSend = dishesCopy.slice(0, 10);
            dishesCopy.splice(0, 10)
            console.log(dishesToSend, "dishes");
            console.log("END");
            return dishesToSend.map((x) => {
              x._id = x._id.toString();

              return x;
            });
          } catch(e){
            console.log("error");
          }
        // }
      }

    },
    Dish: async (root, args, {Dish}) =>{
      try{
        const dish = await Dish.findById(args._id);
        console.log(dish);
        return dish
      } catch(e){
        console.log("error");
      }
    },
    restaurant: async (root, args, {Restaurant}) =>{
      try{
        // console.log("start query", args);
        const restaurant = await Restaurant.findById(args._id);
        // console.log("args", args._id);
        return restaurant
        // return restaurants.map((x) => {
        //   x._id = x._id.toString();
        //   return x;
        // })
      } catch(e){
        console.log("error");
      }
    },
  },
  Mutation: {
    addDish: async (root, args, { Dish }) => {
      // { _id: 123123, name: "whatever"}
      const dish = await new Dish(args).save();
      dish._id = dish._id.toString();
      return dish;
    },
  },
};
