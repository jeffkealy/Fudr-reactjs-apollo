import React from 'react';
import { gql, graphql } from 'react-apollo';
import './Cards.css';


const Dish  = ({ data: { loading, error, dishes  }}) => {
  if (loading) {
    return <p>Loading...</p>

  }
  if (error) {
    return <p>{error.message}</p>
  }
  console.log("dishes", dishes);

  return (
      <div>
        <h2>{dishes.dishName}</h2>
        <h2>{dishes.restaurant_id}</h2>
        <img className="image" src={dishes.photourl} alt=""/>
        <Restaurant restaurantID={item.restaurant_id}/>
      </div>
  )

}

const dishesListQuery = gql`
  query DishesListQuery {
    dishes {
      id
      dishName
      photourl
      restaurant_id
    }
  }

`;

export default graphql(dishesListQuery)(Dish)
