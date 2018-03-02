import React from 'react';
import { gql, graphql } from 'react-apollo';
import '../styles/SwipeCard.css';


const Dish  = ({ data: { loading, error, dish  }}) => {
  if (loading) {
    return <p>Loading...</p>

  }
  if (error) {
    return <p>{error.message}</p>
  }
  if (dish) {
    return (
        <div>
          <h2>{dish.dishName}</h2>
          <h2>{dish.restaurant_id}</h2>
          <img className="image" src={dish.photourl} alt=""/>
        </div>
    )
  } else {
    return null
  }


}

export const dishQuery = gql`
  query dishQuery ($_id: String!){
    dish ( _id: $_id) {
      _id
      dishName
      photourl
      factual_id
      cuisinetype
      restaurant_id
    }
  }

`;

export default graphql(dishQuery, {
  options: (props) => ({
    variables: { _id: props.dishID}
  }),
})(Dish)
