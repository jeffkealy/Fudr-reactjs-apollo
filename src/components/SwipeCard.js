import React, {Component} from 'react';
import Cards, { Card } from 'react-swipe-card'
import { gql, graphql } from 'react-apollo';
import '../styles/SwipeCard.css';
import InfoModal from './InfoModal';
// import Dishes from './Dishes.js'
import Restaurant from './Restaurant.js'




class SwipeCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      yesDishes:[],
      currentDish:{}

    }
    this.swipe = this.swipe.bind(this)

    console.log("constructor props", this.props );


  }
  componentDidUpdate(prevProps, prevState){
    // console.log("componentDidUpdate state", this.state);
    // console.log("componentDidUpdate props", this.props);

    // console.log("currentDish", this.props.DishesListQuery.allDishes[0]);
    // console.log("this.state.currentDish", this.state.currentDish.dishName);
    console.log("componentDidUpdate");
    let cd = this.props.DishesListQuery.allDishes[0]
    if (this.state.currentDish.dishName === undefined) {
      console.log("if");
      this.setState((props) =>({
        currentDish: cd
      }))
    }
  }
  swipe(allDishes, item, i, swipe){
    let currentDish = allDishes[i+1]
    if (swipe === "right") {
      // console.log(swipe);
      let addYesDish = this.state.yesDishes.slice()
      addYesDish.push(item)
      console.log("addedDish", addYesDish);
      // console.log("INDEX", i);
      this.setState(() => ({
        yesDishes: addYesDish,
        currentDish: currentDish
      }));

      console.log("swipe currentDish", this.state.currentDish);

    } else {
      console.log(swipe);
      this.setState(() => ({
        currentDish: currentDish
      }));

    }
    if ((i+2)% 10 === 0) {
        this.onFetchMore()
    }
  }
  onFetchMore(){
    const  { fetchMore }  = this.props.DishesListQuery;
     fetchMore({
       updateQuery: (previousResult, { fetchMoreResult }) => {
         console.log("fetchMore");
         return {
           ...previousResult,
           // Add the new matches data to the end of the old matches data.
           allDishes: [
             ...previousResult.allDishes,
             ...fetchMoreResult.allDishes,
           ],
         };
       },
     });
   }
  render(){
    const {loading, error, allDishes} = this.props.DishesListQuery;
    let left = "left"
    let right = "right"
    if (loading) {
        return <p>Loading...</p>
      }
    if (error) {
      return <p>{error.message}</p>
    }
      console.log("RENDER", allDishes);
      return (
        <div >
          <Cards
            onEnd={()=>console.log("End")}
            alertLeft={<div>No</div>}
            alertRight={<div>Yes</div>}
            className='card-container'
            >
            {allDishes.map((item, i) =>

                <Card key={i}
                 onSwipeLeft={()=>this.swipe(allDishes, item, i, left)}
                 onSwipeRight={()=>this.swipe(allDishes, item,i, right)}

                 >
                 <div className="card-contents">
                   <img className="card-image" src={item.photourl} alt="Dish"/>
                   <div className="card-text">
                     <h2>{item.dishName}</h2>
                     <Restaurant restaurantID={item.restaurant_id}/>
                   </div>
                  </div>
                </Card>
              )}
          </Cards>
          <InfoModal
            currentDish={this.state.currentDish}
            restaurantID={this.state.currentDish.restaurant_id}
            ></InfoModal>
        </div>
      )

  }


}


// <img className="image" src={item.photourl} alt=""/>



const dishesListQuery = gql`
  query DishesListQuery {
    allDishes {
      _id
      dishName
      photourl
      restaurant_id
    }
  }

`;

// export const restaurantQuery = gql`
// query RestaurantQuery {
//   restaurant ( _id: "5849abb07d2c6b79132d0e45") {
//     _id
//     name
//     address
//   }
// }
// `;

// const queryOptions = {
//   name: 'RestaurantQuery',
//   options: (props) => (console.log(props),{
//     variables: {
//       restaurantId: props
//     },
//   }),
// }

// SwipeCard = compose(
// graphql(dishesListQuery,{ name: 'DishesListQuery' }),
// // graphql(restaurantQuery, queryOptions),
// ) (SwipeCard);

SwipeCard = graphql(dishesListQuery,{
  name: 'DishesListQuery'
}
)(SwipeCard);

export default SwipeCard
