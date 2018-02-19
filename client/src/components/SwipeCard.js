import React, {Component} from 'react';
import Cards, { Card } from 'react-swipe-card'
import { gql, graphql } from 'react-apollo';
import './Cards.css';
import InfoModal from './InfoModal';
// import Dish from './Dish.js'
import Restaurant from './Restaurant.js'




class SwipeCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      left: "left",
      right: "right",
      yesDishes:[],

    }
    this.swipeLeft = this.swipeLeft.bind(this)
    // this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);

    console.log("constructor props", this.props );

  }
  componentWillMount() {
    // Modal.setAppElement('body');
    // this.setState((prevState, props) => ({
    // }));
    console.log("componentWillMount", this.props);

  }
  componentDidMount(){
    console.log("componentDidMount props", this.props);
    console.log("componentDidMount state", this.state);
  }

  swipeLeft(allDishes, i ){
    let addYesDish = this.state.yesDishes.slice()
    addYesDish.push(allDishes[i])
    console.log("addedDish", addYesDish);
    console.log("INDEX", i);
    this.setState((prevState, props) => ({
      yesDishes: addYesDish
    }));

    console.log(this.state.yesDishes);
    // dishesList = allDishes[i].push()
    // console.log("swipeLeft", dishes);
    if ((i+2)% 10 === 0) {
        console.log("IF");
        this.onFetchMore()
    }
  }

  swipeRight(allDishes, i)  {
    console.log(allDishes);
    if ((i+2)% 10 === 0) {
        console.log("IF");
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
   // openModal() {
   //   console.log(this);
   //   this.setState({modalIsOpen: true});
   // }
   // afterOpenModal() {
   //   // references are now sync'd and can be accessed.
   //   this.style.color = '#f00';
   // }
   //
   // closeModal() {
   //   this.setState({modalIsOpen: false});
   // }
  render(){
    const {loading, error, allDishes} = this.props.DishesListQuery;
    if (loading) {
        return <p>Loading...</p>
      }
    if (error) {
      return <p>{error.message}</p>
    }
      console.log("RENDER", allDishes);
      return (
        <div className="cardModalWrapper">
          <Cards
            onEnd={()=>console.log("End")}
            alertLeft={<div>No</div>}
            alertRight={<div>Yes</div>}
            className='card-container'
            >
            {allDishes.map((item, i) =>

                <Card key={i}
                 onSwipeLeft={()=>this.swipeLeft(allDishes, i)}
                 onSwipeRight={()=>this.swipeRight(allDishes,i)}>
                   <div>
                     <h2>{item.dishName}</h2>
                     <Restaurant restaurantID={item.restaurant_id}/>
                     <div
                       className="image-container"
                       style={{'backgroundImage':`url(${item.photourl})`}}
                         >
                     </div>

                   </div>
                </Card>
              )}
          </Cards>
          <InfoModal></InfoModal>
        </div>
      )

  }


}


// <img className="image" src={item.photourl} alt=""/>


// const SwipeCard = ({ data: { loading, error, dishes  }}) => {
//   console.log("dishes data", dishes);
//
//   if (loading) {
//     return <p>Loading...</p>
//   }
//   if (error) {
//     return <p>{error.message}</p>
//   }
//   return (
//       <Cards onEnd={console.log('end')} alertLeft={<div>No</div>} alertRight={<div>Yes</div>} className='master-root'>
//         {dishes.map((item, i) =>
//
//             <Card key={i}
//              onSwipeLeft={()=>console.log(item.id,i)}
//              onSwipeRight={()=>this.props.swipeRight(item.id,i)}
//              >
//                <div>
//                 <h2>{item.dishName}</h2>
//                 <img className="image" src={item.photourl} alt=""/>
//
//               </div>
//             </Card>
//           )}
//       </Cards>
//       )
// }


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
