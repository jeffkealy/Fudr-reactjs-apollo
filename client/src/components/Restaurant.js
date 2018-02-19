import React from 'react';
import { gql, graphql } from 'react-apollo';

const Restaurant  = ({ data: { loading, error, restaurant  }}) => {
  if (loading) {
    return <p>Loading...</p>

  }
  if (error) {
    return <p>{error.message}</p>
  }
  else {
    return (
      <div>
        <p>{restaurant.name}</p>
      </div>
    )
  }

}

export const restaurantQuery = gql`
query RestaurantQuery ($_id: String!) {
  restaurant ( _id: $_id) {
    _id
    name
    address
  }
}
`;




export default graphql(restaurantQuery, {
  options: (props) => ({
    variables: { _id: props.restaurantID },
  }),
})(Restaurant);
